import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, firstValueFrom, map } from 'rxjs';
import { DiaHora } from 'src/app/interfaces/diaHora';
import { HorarioEspecialidad } from 'src/app/interfaces/horarioEspecialidad';
import { Usuario } from 'src/app/interfaces/usuario';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { EspecialidadService } from 'src/app/servicios/entidades/especialidad/especialidad.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';

@Component({
  selector: 'app-asignar-horario',
  templateUrl: './asignar-horario.component.html',
  styleUrls: ['./asignar-horario.component.css'],
})
export class AsignarHorarioComponent {
  //#region Constructor
  constructor(
    private especialidadService: EspecialidadService,
    private usuarioService: UsuarioService,
    private firebaseService: FirebaseAuthService
  ) {}

  //#endregion

  //#region Propiedades
  especialidades!: any;
  form!: FormGroup;
  // usuarioDbLogueado!: Usuario;
  usuario: any;
  isLogged: boolean = this.firebaseService.isLoggedIn;
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

    // this.usuarios = this.usuarioService.TraerTodos();
    this.usuarioService.getProfesional(this.mail).then((usuario: any) => {
      console.log(usuario)
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
  CrearDisponibilidad() {
    // const horario: Horario = {
    //   especialidad: this.especialidad?.value,
    //   hora_inicio: this.hora_inicio?.value,
    //   hora_fin: this.hora_fin?.value,
    //   duracion: this.duracion?.value,
    //   dias: this.dias?.value,
    // };
   
    let horarioEspecialidad: HorarioEspecialidad = {
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
    
      horarioEspecialidad.diasHorarios?.push(diaHora);
    });
    this.usuario.horarioEspecialidad = horarioEspecialidad;
    
    this.usuarioService.Modificar(this.mail,this.usuario);

    //   let respuesta = this.usuarioServicio.Crear(usuario);
    //   respuesta.then((response) => {
    //     if (response.valido) {
    //       // this.alertaMensajeSucces(response.mensaje);
    //       // this._usuarioService.setUserToLocalStorage(user);
    //       // this._router.navigate(['usuario/login']);
    //     } else {
    //       // this.alertaMensajeError(response.mensaje);
    //     }
    //     alert(response.valido);
    //   });
  }
  //#endregion
}
