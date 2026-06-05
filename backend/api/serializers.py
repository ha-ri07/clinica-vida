from rest_framework import serializers
from .models import Especialidad, Doctor, Cita


class EspecialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidad
        fields = ['id', 'nombre', 'descripcion', 'icono', 'color', 'servicios']


class DoctorSerializer(serializers.ModelSerializer):
    especialidad_nombre = serializers.CharField(source='especialidad.nombre', read_only=True)
    
    class Meta:
        model = Doctor
        fields = [
            'id', 'nombre', 'especialidad', 'especialidad_nombre', 
            'imagen', 'experiencia', 'rating', 'disponible', 
            'email', 'telefono', 'creado_en', 'actualizado_en'
        ]
        read_only_fields = ['creado_en', 'actualizado_en']


class CitaSerializer(serializers.ModelSerializer):
    especialidad_nombre = serializers.CharField(source='especialidad.nombre', read_only=True)
    doctor_nombre = serializers.CharField(source='doctor.nombre', read_only=True)
    
    class Meta:
        model = Cita
        fields = [
            'id', 'nombre', 'cedula', 'email', 'telefono', 'especialidad', 
            'especialidad_nombre', 'doctor', 'doctor_nombre', 
            'fecha', 'hora', 'motivo', 'estado', 'creado_en', 'actualizado_en'
        ]
        read_only_fields = ['creado_en', 'actualizado_en']


class CitaCrearSerializer(serializers.ModelSerializer):
    """Serializer para crear citas sin requerir especialidad y doctor"""
    class Meta:
        model = Cita
        fields = [
            'nombre', 'cedula', 'email', 'telefono', 'especialidad', 
            'doctor', 'fecha', 'hora', 'motivo'
        ]
