from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Especialidad(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField()
    icono = models.CharField(max_length=50, default='FaStethoscope')
    color = models.CharField(max_length=7, default='#039be5')
    servicios = models.JSONField(default=list)
    
    class Meta:
        ordering = ['nombre']
        verbose_name_plural = 'Especialidades'
    
    def __str__(self):
        return self.nombre


class Doctor(models.Model):
    nombre = models.CharField(max_length=150)
    especialidad = models.ForeignKey(Especialidad, on_delete=models.CASCADE, related_name='doctores')
    imagen = models.URLField()
    experiencia = models.CharField(max_length=50)
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        default=5
    )
    disponible = models.BooleanField(default=True)
    email = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['nombre']
    
    def __str__(self):
        return f"{self.nombre} - {self.especialidad.nombre}"


class Cita(models.Model):
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('confirmada', 'Confirmada'),
        ('completada', 'Completada'),
        ('cancelada', 'Cancelada'),
    ]
    
    nombre = models.CharField(max_length=150)
    cedula = models.CharField(max_length=20, default="", verbose_name="Cédula de Ciudadanía")
    email = models.EmailField()
    telefono = models.CharField(max_length=20)
    especialidad = models.ForeignKey(Especialidad, on_delete=models.SET_NULL, null=True)
    doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True, related_name='citas')
    fecha = models.DateField()
    hora = models.TimeField()
    motivo = models.TextField()
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-creado_en']
    
    def __str__(self):
        return f"Cita de {self.nombre} - {self.fecha} {self.hora}"
