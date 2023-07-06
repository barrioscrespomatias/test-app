import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionUsuariosRoutingModule } from './gestion-usuarios-routing.module';
import { GestionUsuariosComponent } from './gestion-usuarios.component';
import { GrillaHorariosComponent } from '../../components/profesional/grilla-horarios/grilla-horarios.component';
import { AsignarHorarioComponent } from '../../components/profesional/asignar-horario/asignar-horario.component';
import { TablaTurnosComponent } from '../../components/tabla-turnos/tabla-turnos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MostrarElementDirective } from '../../directive/mostrarElemento/mostrar-element.directive';
import { SolicitarTurnoComponent } from '../../components/solicitar-turno/solicitar-turno.component';
import { FiltroUsuariosPipe } from '../../pipes/filtroUsuarios/fitro-usuarios.pipe';
import { FiltroTurnosPipe } from '../../pipes/filtroTurnos/filtro-turnos.pipe';
import { FiltroTurnosPacientePipe } from '../../pipes/filtroTurnosPaciente/filtro-turnos-paciente.pipe';
import { EstadoTurnosPipe } from '../../pipes/estadoTurnos/estado-turnos.pipe';
import { DiaSemanaPipe } from '../../pipes/diaSemana/dia-semana.pipe';
import { ObtenerPacientesPipe } from '../../pipes/obtenerPacientes/obtener-pacientes.pipe';
import { ObtenerPalabrasClavesPipe } from '../../pipes/obtenerPalabrasClaves/obtener-palabras-claves.pipe';
import { ObtenerEspecialidadProfesionalPipe } from '../../pipes/obtenerEspecialidadProfesional/obtener-especialidad-profesional.pipe';
import { ObtenerProfesionalPacientePipe } from '../../pipes/obtenerProfesionalPaciente/obtener-profesional-paciente.pipe';
import { CustomNg2SearchPipe } from '../../pipes/customNg2Search/custom-ng2-search.pipe';
import { TurnoPorEstadoPipe } from '../../pipes/turnoPorEstado/turno-por-estado.pipe';
import { ProfesionalDelTurnoPipe } from '../../pipes/profesionalDelTurno/profesional-del-turno.pipe';
import { ObtenerFechasTurnosPipe } from '../../pipes/obtenerFechasTurnos/obtener-fechas-turnos.pipe';
import { ObtenerValoresAtributosPipe } from '../../pipes/obtenerValoresAtributos/obtener-valores-atributos.pipe';
import { UsuariosProfesionalesPipe } from '../../pipes/filtroUsuariosProfesionales/usuarios-profesionales.pipe';
import { FiltroTurnosHistoriaClinicaPipe } from '../../pipes/filtroTurnosHistoriaClinica/filtro-turnos-historia-clinica.pipe';
import { ObtenerTodosLosPacientesPipe } from '../../pipes/obtenerTodosLosPacientes/obtener-todos-los-pacientes.pipe';
import { BooleanoPipe } from '../../pipes/booleano/booleano.pipe';


import { CancelarTurnoComponent } from '../../components/cancelar-turno/cancelar-turno.component';
import { VerResenaComponent } from '../../components/ver-resena/ver-resena.component';
import { CompletarEncuestaComponent } from '../../components/completar-encuesta/completar-encuesta.component';
import { CalificarAtencionComponent } from '../../components/calificar-atencion/calificar-atencion.component';
import { RechazarTurnoComponent } from '../../components/rechazar-turno/rechazar-turno.component';
import { AceptarTurnoComponent } from '../../components/aceptar-turno/aceptar-turno.component';
import { FinalizarTurnoComponent } from '../../components/finalizar-turno/finalizar-turno.component';
import { MiPerfilComponent } from '../../components/mi-perfil/mi-perfil.component';
import { TablaHistoriasClinicasComponent } from '../../components/tabla-historias-clinicas/tabla-historias-clinicas.component';
import { HistoriaClinicaComponent } from '../../components/historia-clinica/historia-clinica.component';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';
import { TurnoRepositorioService } from 'src/app/servicios/repositorio/turno/turno-repositorio.service';
import { UsuariosComponent } from 'src/app/components/usuarios/usuarios.component';
import { RegistroModule } from '../registro/registro.module';



@NgModule({
  declarations: [
    GestionUsuariosComponent,
    GrillaHorariosComponent,
    AsignarHorarioComponent,
    TablaTurnosComponent,
    MostrarElementDirective,
    SolicitarTurnoComponent,
    UsuariosComponent,

    FiltroUsuariosPipe,
    FiltroTurnosPipe,
    FiltroTurnosPacientePipe,
    EstadoTurnosPipe,
    DiaSemanaPipe,
    ObtenerPacientesPipe,
    ObtenerPalabrasClavesPipe,
    ObtenerEspecialidadProfesionalPipe,
    ObtenerProfesionalPacientePipe,
    CustomNg2SearchPipe,
    TurnoPorEstadoPipe,
    ProfesionalDelTurnoPipe,
    ObtenerFechasTurnosPipe,
    ObtenerValoresAtributosPipe,
    UsuariosProfesionalesPipe,
    FiltroTurnosHistoriaClinicaPipe,
    ObtenerTodosLosPacientesPipe,
    BooleanoPipe,

    CancelarTurnoComponent,
    VerResenaComponent,
    CompletarEncuestaComponent,
    CalificarAtencionComponent,
    RechazarTurnoComponent,
    AceptarTurnoComponent,
    FinalizarTurnoComponent,
    MiPerfilComponent,
    TablaHistoriasClinicasComponent,
    HistoriaClinicaComponent,
  ],
  imports: [
    CommonModule,
    GestionUsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RegistroModule
  ],
  providers: [TurnoService, TurnoRepositorioService],
  exports: [
    CustomNg2SearchPipe // Agrega el componente en la sección de exports
  ]
})
export class GestionUsuariosModule { }
