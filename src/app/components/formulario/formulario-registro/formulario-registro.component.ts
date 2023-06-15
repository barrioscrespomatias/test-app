import { Component, Input } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, doc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { disableDebugTools } from '@angular/platform-browser';
import { Observable, Subscription, map } from 'rxjs';
import { Especialidad } from 'src/app/clases/funcional/especialidad/especialidad';
import { EspecialidadProfesionalMtm } from 'src/app/clases/manyToMany/especialidadProfesionalMtm/especialidad-profesional-mtm';
import { Paciente } from 'src/app/clases/personas/paciente/paciente';
import { Profesional } from 'src/app/clases/personas/profesional/profesional';
import { User } from 'src/app/clases/user/user';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EspecialidadService } from 'src/app/services/especialidad/especialidad.service';
import { EspecialidadProfesionalMtmService } from 'src/app/services/especialidadProfesional/especialidad-profesional-mtm.service';
import { ImagenService } from 'src/app/services/imagen/imagen.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { ProfesionalService } from 'src/app/services/profesional/profesional.service';
import { UsuarioPerfilService } from 'src/app/services/usuarioPerfil/usuario-perfil.service';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.css'],
})
export class FormularioRegistroComponent {
  form!: FormGroup;
  @Input() perfilRecibido: string = '';
  @Input() emailRecibido: any;
  suscripcionEspecialidadService!: Subscription;
  suscripcionUsuarioFirebaseService!: Subscription;
  especialidades!: any;
  selectedOptions: any[] = [];
  profesionalCreado: any;

  constructor(
    private firebaseService: FirebaseAuthService,
    // private pacienteService: PacienteService,
    private profesionalService: ProfesionalService,
    private especialidadService: EspecialidadService,
    // private imagenService: ImagenService,
    private usuarioPerfilService: UsuarioPerfilService,
    private especialidadProfesionalMtmService: EspecialidadProfesionalMtmService,
    private firestore: Firestore,
    private authService: AuthService,
  ) {}

  //#region NG Hooks

  async ngOnInit() {
    this.especialidades = (await this.especialidadService.TraerTodo()).pipe(
      map((response: any[]) =>
        response.map((especialidadDb) => {
          const especialidadClass: Especialidad = {
            id: especialidadDb.id,
            nombre: especialidadDb.nombre,
            segundoNombre: especialidadDb.segundoNombre,
            borrado: especialidadDb.borrado,
            fechaCreacion: especialidadDb.fechaCreacion,
            ultimaModificacion: especialidadDb.ultimaModificacion,
          };
          return especialidadClass;
        })
      )
    );

    /*
    this.usuarioFirebase = (await this.usuarioFirebaseService.TraerPorEmail('probando1@yopmail.com')).pipe(
        map((response: any[]) =>
          response.map((userFirebasedDb) => {

            // public uid: string = '';
            // public email: string = '';
            // public displayName: string = '';
            // public photoURL: string = '';
            // public emailVerified: boolean = false;

            const usuarioFirebaseClass: User = {
              // entity
              uid: userFirebasedDb.uid,
              email: userFirebasedDb.email,
              displayName: userFirebasedDb.displayName,
              photoURL: userFirebasedDb.photoURL,
              emailVerified: userFirebasedDb.emailVerified,
            };
            return usuarioFirebaseClass;
          })
        )
      );

    */

    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      apellido: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      edad: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      obra_social: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      dni: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      // mail: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      contrasena: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      img_perfil: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      especialidad: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      perfil: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
    });
  }

  //#endregion

  //#region Getters
  get nombre() {
    return this.form.get('nombre');
  }

  get apellido() {
    return this.form.get('apellido');
  }

  get edad() {
    return this.form.get('edad');
  }

  get obra_social() {
    return this.form.get('obra_social');
  }

  get dni() {
    return this.form.get('dni');
  }

  // get mail() {
  //   return this.form.get('mail');
  // }

  get contrasena() {
    return this.form.get('contrasena');
  }

  get img_perfil() {
    return this.form.get('img_perfil');
  }

  get especialidad() {
    return this.form.get('especialidad');
  }

  get perfil() {
    return this.form.get('perfil');
  }

  //#endregion

  async CrearUsuario() {
    var paciente = new Paciente();
    var profesional = new Profesional();

    this.authService.SignUp('matiprueba@yopmail.com', '123456');

    if (this.perfil?.value == 'Paciente') {
      paciente.nombre = this.nombre?.value;
      paciente.segundoNombre = this.apellido?.value;
      paciente.edad = this.edad?.value;
      paciente.obraSocial = this.obra_social?.value;
      paciente.dni = this.dni?.value;
      paciente.mail = this.emailRecibido;
      paciente.contrasena = this.contrasena?.value;
      //TODO la imagen de perfil tiene que estar cargada en una coleccion distinta.
      // paciente.imagenesPerfil = this.img_perfil?.value;
      paciente.perfil = 2;
    } else {
      profesional.nombre = this.nombre?.value;
      profesional.segundoNombre = this.apellido?.value;
      profesional.edad = this.edad?.value;
      //TODO no se deberia poder agregar un dni ya existente en la db.
      profesional.dni = this.dni?.value;
      profesional.mail = this.emailRecibido;
      profesional.contrasena = this.contrasena?.value;
      //TODO la imagen de perfil tiene que estar cargada en una coleccion distinta.
      // profesional.imagenesPerfil = this.img_perfil?.value;
      profesional.especialidadesIds = this.especialidad?.value;
      profesional.perfil = 3;


      //Creo un registro para guardar en la coleccion.
      const coleccion = collection(this.firestore, 'profesionales');
      const documentoNuevo = doc(coleccion);
      const profesionalId = documentoNuevo.id;

       

      //Guardo la relacion usuario perfil.
      // var usuarioPerfil = new UsuarioPerfil();
      // usuarioPerfil.firebaseUserEmail = this.emailRecibido;
      // usuarioPerfil.profesionalId = profesional.id;

      // if(usuarioPerfil.firebaseUserEmail != '' && usuarioPerfil.profesionalId != ''){
      //   this.usuarioPerfilService.guardar(usuarioPerfil);
      // }      

      try {
        //Crear registros en manyToMany.
        if (profesional.especialidadesIds) {
          profesional.especialidadesIds.forEach((item) => {
            if (item != '') {
              var especialidadProfesional = new EspecialidadProfesionalMtm();
              especialidadProfesional.profesionalId = profesionalId;
              especialidadProfesional.especialidadId = item;
              this.especialidadProfesionalMtmService.guardar(
                especialidadProfesional
              );
            }
          });

          //Crear registro de profesional
          this.profesionalService.guardar(profesional, profesionalId);
        }
      } catch (error) {
        console.error(error);
      }
    }



  }
}
