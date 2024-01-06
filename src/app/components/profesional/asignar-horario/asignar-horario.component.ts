import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DiaHora } from 'src/app/interfaces/diaHora';
import { HorarioEspecialidad } from 'src/app/interfaces/horarioEspecialidad';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { EspecialidadService } from 'src/app/servicios/entidades/especialidad/especialidad.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';
import { SweetAlertService } from 'src/app/servicios/sweet-alert/sweet-alert.service';
import { slideAnimation } from '../../../animation';
import { map } from 'rxjs';


@Component({
  selector: 'app-asignar-horario',
  templateUrl: './asignar-horario.component.html',
  styleUrls: ['./asignar-horario.component.css'],
  animations: [slideAnimation]
})
export class AsignarHorarioComponent {
  //#region Constructor
  constructor(
    private especialidadService: EspecialidadService,
    private usuarioService: UsuarioService,
    private firebaseService: FirebaseAuthService,
    private sweetAlertServicio: SweetAlertService,
    public router: Router,
  ) {}

  //#endregion

  estadoActual: string = 'estadoInicial';

  cambiarEstado() {
    this.estadoActual = 'estadoFinal';
  }
  //#region Propiedades
  especialidades!: any;
  form!: FormGroup;
  usuario: any;
  mail: string = this.firebaseService.userName;

  valorDias: { clave: string; valor: number }[] = [];

  //#endregion

  //#region Hooks

  async ngOnInit() {
    this.valorDias = [
      { clave: 'Lunes', valor: 1 },
      { clave: 'Martes', valor: 2 },
      { clave: 'Miércoles', valor: 3 },
      { clave: 'Jueves', valor: 4 },
      { clave: 'Viernes', valor: 5 },
    ];

    this.especialidades = (await this.especialidadService.TraerTodos()).pipe(
      map((response: any[]) =>
        response
          // .filter(especialidadDb => especialidadDb.nombre === 'Fonoaudiologia')
          .map((especialidadDb) => {
            const especialidadClass: any = {
              docRef: especialidadDb.docRef,
              nombre: especialidadDb.nombre,
            };
            return especialidadClass;
          })
      )
    );

    this.usuarioService.getUsuario(this.mail).then((usuario: any) => {
      this.usuario = usuario;
    });

    this.form = new FormGroup({
      especialidad: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      hora_inicio: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      hora_fin: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      duracion: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      dias: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
    });
  }

  //#endregion

  //#region Getters
  get especialidad() {
    return this.form.get('especialidad');
  }

  get hora_inicio() {
    return this.form.get('hora_inicio');
  }

  get hora_fin() {
    return this.form.get('hora_fin');
  }

  get duracion() {
    return this.form.get('duracion');
  }

  get dias() {
    return this.form.get('dias');
  }

  //#endregion

  //#region Metodos
  ModificarDisponibilidad(){
    let nuevoHorario: HorarioEspecialidad = {
      diasHorarios: []
    };

    this.dias?.value.forEach((dia: any) => {
      const diaHora: DiaHora = {
        dia: dia,
        hora_inicio: this.hora_inicio?.value,
        hora_fin: this.hora_fin?.value,
        duracion: this.duracion?.value,
        especialidad: this.especialidad?.value
      };
    
      nuevoHorario.diasHorarios?.push(diaHora);
    });

    this.usuario.horarioEspecialidad = nuevoHorario;

    // nuevoHorario.diasHorarios?.forEach((nh: DiaHora) => {
    //   const index = this.usuario.horarioEspecialidad.diasHorarios?.findIndex((dia: DiaHora) => dia.dia === nh.dia);
    //   if (index !== -1) {
    //     // Si se encuentra, eliminar el día existente
    //     this.usuario.horarioEspecialidad.diasHorarios?.splice(index, 1);        
    //   }
    //   this.usuario.horarioEspecialidad.diasHorarios?.push(nh);
      
    // });

    var respuesta = this.usuarioService.Modificar(this.mail,this.usuario);
    respuesta.then((response) => {
      if (response.valido) {
        this.sweetAlertServicio.MensajeExitoso("Horarios asignados correctamente!")
        // this.alertaMensajeSucces(response.mensaje);
        // this._usuarioService.setUserToLocalStorage(user);
        // this.router.navigate(['']);
      } else {
        this.sweetAlertServicio.MensajeError("Hubo un error al asignar los horarios, intente nuevamente.")
        // this.alertaMensajeError(response.mensaje);
      }      
    });
  }
  //#endregion
}