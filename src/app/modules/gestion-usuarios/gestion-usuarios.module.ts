import { NgModule } from '@angular/core';
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
import { CancelarTurnoComponent } from '../../components/cancelar-turno/cancelar-turno.component';
import { VerResenaComponent } from '../../components/ver-resena/ver-resena.component';
import { CompletarEncuestaComponent } from '../../components/completar-encuesta/completar-encuesta.component';
import { CalificarAtencionComponent } from '../../components/calificar-atencion/calificar-atencion.component';
import { RechazarTurnoComponent } from '../../components/rechazar-turno/rechazar-turno.component';
import { AceptarTurnoComponent } from '../../components/aceptar-turno/aceptar-turno.component';
import { FinalizarTurnoComponent } from '../../components/finalizar-turno/finalizar-turno.component';
import { MiPerfilComponent } from '../../components/mi-perfil/mi-perfil.component';
import { CompletarHistoriaClinicaComponent } from '../../components/completar-historia-clinica/completar-historia-clinica.component';
import { TablaHistoriasClinicasComponent } from '../../components/tabla-historias-clinicas/tabla-historias-clinicas.component';


@NgModule({
  declarations: [
    GestionUsuariosComponent,
    GrillaHorariosComponent,
    AsignarHorarioComponent,
    TablaTurnosComponent,
    MostrarElementDirective,
    SolicitarTurnoComponent,
    FiltroUsuariosPipe,
    FiltroTurnosPipe,
    FiltroTurnosPacientePipe,
    EstadoTurnosPipe,
    DiaSemanaPipe,
    ObtenerPacientesPipe,
    ObtenerPalabrasClavesPipe,
    CancelarTurnoComponent,
    VerResenaComponent,
    CompletarEncuestaComponent,
    CalificarAtencionComponent,
    RechazarTurnoComponent,
    AceptarTurnoComponent,
    FinalizarTurnoComponent,
    MiPerfilComponent,
    CompletarHistoriaClinicaComponent,
    TablaHistoriasClinicasComponent
  ],
  imports: [
    CommonModule,
    GestionUsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class GestionUsuariosModule { }
