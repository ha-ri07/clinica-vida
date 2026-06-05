import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'clinica_vida_backend.settings')
django.setup()

from api.models import Especialidad, Doctor, Cita

# Limpiar datos previos
Especialidad.objects.all().delete()
Doctor.objects.all().delete()

# Crear especialidades
especialidades = [
    {
        'nombre': 'Medicina General',
        'descripcion': 'Atención médica primaria y preventiva para pacientes de todas las edades, enfocada en la promoción de la salud y el diagnóstico temprano.',
        'icono': 'FaUserMd',
        'color': '#0d9488',
        'servicios': ['Consulta Médica General', 'Chequeo Médico Preventivo', 'Lectura de Exámenes', 'Certificados Médicos']
    },
    {
        'nombre': 'Cardiología',
        'descripcion': 'Diagnóstico y tratamiento de enfermedades del corazón y sistema cardiovascular.',
        'icono': 'FaHeart',
        'color': '#e53935',
        'servicios': ['Electrocardiograma', 'Ecocardiograma', 'Prueba de esfuerzo', 'Cateterismo cardíaco']
    },
    {
        'nombre': 'Neurología',
        'descripcion': 'Atención de trastornos del sistema nervioso central y periférico.',
        'icono': 'FaBrain',
        'color': '#8e24aa',
        'servicios': ['Electroencefalograma', 'Resonancia magnética', 'Estudio de sueño', 'Neurorehabilitación']
    },
    {
        'nombre': 'Pediatría',
        'descripcion': 'Cuidado integral de la salud infantil desde el nacimiento hasta la adolescencia.',
        'icono': 'FaBaby',
        'color': '#fb8c00',
        'servicios': ['Control de niño sano', 'Vacunación', 'Nutrición infantil', 'Desarrollo infantil']
    },
    {
        'nombre': 'Radiología',
        'descripcion': 'Diagnóstico por imagen con tecnología de última generación.',
        'icono': 'FaRadiation',
        'color': '#039be5',
        'servicios': ['Rayos X', 'Tomografía', 'Resonancia magnética', 'Ultrasonido']
    },
    {
        'nombre': 'Traumatología',
        'descripcion': 'Tratamiento de lesiones y enfermedades del sistema musculoesquelético.',
        'icono': 'FaBone',
        'color': '#43a047',
        'servicios': ['Cirugía ortopédica', 'Artroscopia', 'Rehabilitación', 'Prótesis']
    },
    {
        'nombre': 'Dermatología',
        'descripcion': 'Diagnóstico y tratamiento de enfermedades de la piel, cabello y uñas.',
        'icono': 'FaAllergies',
        'color': '#fdd835',
        'servicios': ['Dermatoscopia', 'Cirugía dermatológica', 'Tratamiento láser', 'Cosmiatría']
    },
]

# Crear especialidades en la BD
created_especialidades = {}
for esp_data in especialidades:
    esp = Especialidad.objects.create(
        nombre=esp_data['nombre'],
        descripcion=esp_data['descripcion'],
        icono=esp_data['icono'],
        color=esp_data['color'],
        servicios=esp_data['servicios']
    )
    created_especialidades[esp_data['nombre']] = esp

# Crear doctores
doctores = [
    {
        'nombre': 'Dr. Alejandro Ruiz',
        'especialidad': 'Cardiología',
        'imagen': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'experiencia': '15 años',
        'rating': 5,
        'disponible': True,
        'email': 'alejandro.ruiz@clinicavida.com',
        'telefono': '+1234567890'
    },
    {
        'nombre': 'Dra. Sofía Méndez',
        'especialidad': 'Neurología',
        'imagen': 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'experiencia': '12 años',
        'rating': 5,
        'disponible': True,
        'email': 'sofia.mendez@clinicavida.com',
        'telefono': '+1234567891'
    },
    {
        'nombre': 'Dr. Carlos Díaz',
        'especialidad': 'Pediatría',
        'imagen': 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'experiencia': '10 años',
        'rating': 4,
        'disponible': True,
        'email': 'carlos.diaz@clinicavida.com',
        'telefono': '+1234567892'
    },
    {
        'nombre': 'Dra. María González',
        'especialidad': 'Radiología',
        'imagen': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'experiencia': '8 años',
        'rating': 5,
        'disponible': False,
        'email': 'maria.gonzalez@clinicavida.com',
        'telefono': '+1234567893'
    },
    {
        'nombre': 'Dr. Luis Fernández',
        'especialidad': 'Traumatología',
        'imagen': 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'experiencia': '20 años',
        'rating': 5,
        'disponible': True,
        'email': 'luis.fernandez@clinicavida.com',
        'telefono': '+1234567894'
    },
    {
        'nombre': 'Dra. Ana López',
        'especialidad': 'Dermatología',
        'imagen': 'https://images.unsplash.com/photo-1594824476960-57c05f9e6f29?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        'experiencia': '7 años',
        'rating': 4,
        'disponible': True,
        'email': 'ana.lopez@clinicavida.com',
        'telefono': '+1234567895'
    },
]

# Crear doctores en la BD
for doc_data in doctores:
    Doctor.objects.create(
        nombre=doc_data['nombre'],
        especialidad=created_especialidades[doc_data['especialidad']],
        imagen=doc_data['imagen'],
        experiencia=doc_data['experiencia'],
        rating=doc_data['rating'],
        disponible=doc_data['disponible'],
        email=doc_data['email'],
        telefono=doc_data['telefono']
    )

print("✓ Base de datos poblada exitosamente")
print(f"✓ {Especialidad.objects.count()} especialidades creadas")
print(f"✓ {Doctor.objects.count()} doctores creados")
