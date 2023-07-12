# ***IMPORTANTE:*** Siempre mirar la URL y/o que selección hay en el navbar (barra de navegación que está fija en la parte superior de la pantalla)


# ***Deploys de cada sprint*** -> [./README_INFO.md](./README_INFO.md)

# Páginas para todos los usuarios no logeados

## Página de inicio
![página de inicio](./assets/readme/bienvenido.png)

## Página para registrarse
![página para registrarse](./assets/readme/registrarse.png)

## Página para ingresar
![Página para ingresar](./assets/readme/iniciar_sesion.png)

# Si ingreso como Paciente 

## Página para ver mi perfil
![Página para ver mi perfil](./assets/readme/paciente_mi-perfil.png)

## Página para ver mi historia clinica
![Página para ver mi historia clinica](./assets/readme/paciente_mi-perfil-mi-historia-clinica.png)

> Nota: tiene la posibilidad de descargar un excel con los datos de la historia clinica

## Página para ver los turnos que ha sacado y sus estados
![Página para ver mi historia clinica](./assets/readme/paciente_ver-turnos.png)

Podría hacer las siguientes acciones
1. Cancelar turno
    1. Solamente debe ser visible si el turno no fue realizado.
    1. Debe dejar un comentario del porque se cancela el turno.
1. Ver reseña.
    1. Solo debe ser visible si el turno tiene un comentario o reseña
cargado.
1. Completar encuesta.
    1. Solamente debe estar visible si el especialista marcó el turno
como realizado y dejo la reseña.
1. Calificar Atención
    1. Solamente debe ser visible una vez que el turno sea
realizado.
    1. El paciente debe dejar un comentario de como fue la
atención del Especialista.


## Página para sacar turnos
![Página para sacar turnos](./assets/readme/paciente_sacar-turnos.png)

1. Primero eligo un especialista
1. Luego una especialidad de dicho especialista
1. Por último eligo un turno (si es que tiene disponibilidad el especialista)


# Si ingreso como Especialista

## Página para ver mi perfil
![Página para ver mi perfil](./assets/readme/especialista_mi-perfil.png)

> Nota: en esta página esta el botón "Cargar Horarios"

## Página para cargar nuevos horarios
![Página para cargar nuevos horarios](./assets/readme/especialista_mi-perfil-cargar-horarios.png)

## Página para ver las historias clinicas de ***mis pacientes***
![Página para ver las historias clinicas de mis pacientes](./assets/readme/especialista_historia-clinica-pacientes.png)

## Página para ver los turnos que tengo que presentarme y los que ya di
![Página para ver los turnos que tengo que presentarme y los que ya di](./assets/readme/especialista_ver-mis-turnos.png)

Podría hacer las siguientes acciones
1. Cancelar turno
    1. Solamente debe ser visible si el turno no fue Aceptado,
Realizado o Rechazado.
    1. Para cancelar el turno se debe dejar un comentario del
porque se cancela el mismo.
1. Rechazar turno
    1. Solamente debe ser visible si el turno no fue Aceptado,
Realizado o Cancelado.
    1. Para rechazar el turno se debe dejar un comentario del
porque se rechaza el mismo.
1. Aceptar turno
    1. Solamente debe ser visible si el turno no fue Realizado,
Cancelado o Rechazado.
1. Finalizar Turno
    1. Solamente debe ser visible si el turno fue Aceptado.
    1. Para finalizar el turno se debe dejar una reseña o comentario
de la consulta y diagnóstico realizado.
1. Ver Reseña
    1. Solo debe ser visible si el turno tiene un comentario o reseña
cargado

> Nota: Ademas al finalizar el turno se puede cargar la historia clinica correspondiente al turno.


# Si ingreso como Administrador

## Página para ver mi perfil
![Página para ver mi perfil](./assets/readme/administrador_mi-perfil.png)

## Página administrar usuarios
![Página administrar usuarios](./assets/readme/administrador_administrar-usuarios.png)

Se puede

1. Ver información de los usuarios , ***con posibilidad de descargar los datos en excel***
1. Aceptar, rechazar o anular a los especialistas
1. Agregar un nuevo especialista,paciente o administrador

## Página para ver todas las historias clinicas
![Página para ver todas las historias clinicas](./assets/readme/administrador_ver-historias-clinicas.png)

## Página para ver los turnos
![Página para ver los turnos](./assets/readme/administrador_ver_turnos.png)

> Nota: solo puede verlos o cancelarlos (siempre y cuando eso sea posible)

## Página para ver los turnos
![Página para ver los turnos](./assets/readme/administrador_ver_turnos.png)

> Nota: solo puede verlos o cancelarlos (siempre y cuando eso sea posible)


## Página para sacar un turno
![Página para sacar un turno](./assets/readme/administrador_sacar_turno.png)

Pasos:

1. Elegir paciente
1. Lo siguiente es elegir un especialista
1. Luego una especialidad de dicho especialista
1. Por último eligo un turno (si es que tiene disponibilidad el especialista)