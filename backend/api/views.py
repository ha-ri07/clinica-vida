from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Especialidad, Doctor, Cita
from .serializers import (
    EspecialidadSerializer, 
    DoctorSerializer, 
    CitaSerializer, 
    CitaCrearSerializer
)


class EspecialidadViewSet(viewsets.ModelViewSet):
    """
    API endpoint para gestionar especialidades médicas.
    """
    queryset = Especialidad.objects.all()
    serializer_class = EspecialidadSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['nombre', 'descripcion']
    ordering_fields = ['nombre']
    ordering = ['nombre']
    
    @action(detail=False, methods=['get'])
    def lista_completa(self, request):
        """Retorna todas las especialidades con sus doctores disponibles"""
        especialidades = Especialidad.objects.prefetch_related('doctores')
        serializer = self.get_serializer(especialidades, many=True)
        return Response(serializer.data)


class DoctorViewSet(viewsets.ModelViewSet):
    """
    API endpoint para gestionar doctores.
    """
    queryset = Doctor.objects.select_related('especialidad').all()
    serializer_class = DoctorSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['especialidad', 'disponible', 'rating']
    search_fields = ['nombre', 'email']
    ordering_fields = ['nombre', 'rating', 'experiencia']
    ordering = ['nombre']
    
    @action(detail=False, methods=['get'])
    def disponibles(self, request):
        """Retorna solo los doctores disponibles"""
        doctores = Doctor.objects.filter(disponible=True).select_related('especialidad')
        serializer = self.get_serializer(doctores, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def por_especialidad(self, request):
        """Retorna doctores agrupados por especialidad"""
        especialidad_id = request.query_params.get('especialidad_id')
        if especialidad_id:
            doctores = Doctor.objects.filter(
                especialidad_id=especialidad_id
            ).select_related('especialidad')
        else:
            doctores = Doctor.objects.all().select_related('especialidad')
        serializer = self.get_serializer(doctores, many=True)
        return Response(serializer.data)


class CitaViewSet(viewsets.ModelViewSet):
    """
    API endpoint para gestionar citas médicas.
    """
    queryset = Cita.objects.select_related('especialidad', 'doctor')
    serializer_class = CitaSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['estado', 'especialidad', 'doctor', 'cedula']
    search_fields = ['nombre', 'email', 'cedula']
    ordering_fields = ['fecha', 'creado_en']
    ordering = ['-creado_en']
    
    def get_serializer_class(self):
        """Usa diferentes serializers según la acción"""
        if self.action == 'create':
            return CitaCrearSerializer
        return CitaSerializer
    
    @action(detail=False, methods=['get'])
    def pendientes(self, request):
        """Retorna solo las citas pendientes"""
        citas = Cita.objects.filter(estado='pendiente').select_related('especialidad', 'doctor')
        serializer = self.get_serializer(citas, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def por_doctor(self, request):
        """Retorna citas de un doctor específico"""
        doctor_id = request.query_params.get('doctor_id')
        if doctor_id:
            citas = Cita.objects.filter(doctor_id=doctor_id).select_related('especialidad', 'doctor')
        else:
            citas = Cita.objects.all().select_related('especialidad', 'doctor')
        serializer = self.get_serializer(citas, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def crear_rapida(self, request):
        """Crea una cita sin asignar doctor específico"""
        serializer = CitaCrearSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
