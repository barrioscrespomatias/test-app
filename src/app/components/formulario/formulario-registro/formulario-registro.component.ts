//#region Imports
import { Component, Input } from '@angular/core';
import { Firestore, collection, doc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, map } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';
import { EspecialidadService } from 'src/app/servicios/entidades/especialidad/especialidad.service';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { Especialidad } from 'src/app/interfaces/especialidad';

//#endregion
@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.css'],
})
export class FormularioRegistroComponent {
  //#region Propiedades
  form!: FormGroup;
  @Input() perfilRecibido: string = '';
  @Input() emailRecibido: any;
  suscripcionEspecialidadService!: Subscription;
  suscripcionUsuarioFirebaseService!: Subscription;
  especialidades!: any;
  selectedOptions: any[] = [];
  profesionalCreado: any;
  fotoUno: string = '';
  fotoDos: string = '';
  nuevaEspecialidad: string = '';


  resultado!: string;

  //#endregion

  //#region Constructor
  constructor(
    private especialidadService: EspecialidadService,
    private firestore: Firestore,
    private usuarioServicio: UsuarioService
  ) {}

  //#endregion

  //#region NG Hooks

  async ngOnInit() {
    this.especialidades = (await this.especialidadService.TraerTodos()).pipe(
      map((response: any[]) =>
        response.map((especialidadDb) => {
          const especialidadClass: any = {
            docRef: especialidadDb.docRef,
            nombre: especialidadDb.nombre,
          };
          return especialidadClass;
        })
      )
    );

    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(10)]),
      apellido: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      edad: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      dni: new FormControl('', [Validators.min(0)]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      imagenPerfil1: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      imagenPerfil2: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      obra_social: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      especialidad: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      perfil: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      especialidad_agregada: new FormControl('', [
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
    });

    // submit() {
    //   if (this.form.valid)
    //   this.resultado = "Todos los datos son válidos";
    // else
    //   this.resultado = "Hay datos inválidos en el formulario";
    // }
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

  get dni() {
    return this.form.get('dni');
  }

  get mail() {
    return this.form.get('mail');
  }

  get contrasena() {
    return this.form.get('contrasena');
  }
  get imagenPerfil1() {
    return this.form.get('imagenPerfil1');
  }
  get imagenPerfil2() {
    return this.form.get('imagenPerfil2');
  }

  get obra_social() {
    return this.form.get('obra_social');
  }

  get especialidad() {
    return this.form.get('especialidad');
  }

  get perfil() {
    return this.form.get('perfil');
  }

  get especialidad_agregada() {
    return this.form.get('especialidad_agregada');
  }

  //#endregion

  //#region Métodos
  CrearUsuario() {
    const usuario: Usuario = {
      nombre: this.nombre?.value,
      apellido: this.apellido?.value,
      edad: this.edad?.value,
      dni: this.dni?.value,
      mail: this.mail?.value,
      contrasena: this.contrasena?.value,
      imagenPerfil1: this.fotoUno,
      imagenPerfil2: this.fotoDos,
      habilitado: this.perfilRecibido == 'Paciente' || this.perfilRecibido == 'Administrador' ? true : true,
      perfil: this.perfilRecibido == 'Profesional' ? 'profesional' : this.perfilRecibido == 'Paciente' ? 'paciente' : 'administrador',
      obraSocial: this.obra_social?.value,
      especialidades: this.especialidad?.value,
    };

    let respuesta = this.usuarioServicio.Crear(usuario);
    respuesta.then((response) => {
      if (response.valido) {
        // this.alertaMensajeSucces(response.mensaje);
        // this._usuarioService.setUserToLocalStorage(user);
        // this._router.navigate(['usuario/login']);
      } else {
        // this.alertaMensajeError(response.mensaje);
      }
      alert(response.valido);
    });
  }

  SubirArchivo(e: any, imgNum: number) {
    if (imgNum == 1) {
      this.fotoUno = `${this.getFecha()}_${1}`;
    } else if (imgNum == 2) {
      this.fotoDos = `${this.getFecha()}_${2}`;
    }

    const storage = getStorage();
    const storageRef = ref(storage, imgNum == 1 ? this.fotoUno : this.fotoDos);

    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      
    });
  }

  getFecha(): string {
    var fecha = new Date();
    let d, m, y, h, min, s, mls;
    d = fecha.getDate();
    m = fecha.getUTCMonth();
    y = fecha.getFullYear();
    h = fecha.getHours().toString();
    min = fecha.getMinutes().toString();
    s = fecha.getSeconds().toString();
    mls = fecha.getMilliseconds().toString();

    return y + '-' + m + '-' + d + '_' + h + '-' + min + '-' + s + '-' + mls;
  }

  AgregarEspecialidad() {
    const especialidad: Especialidad = {
      nombre: this.especialidad_agregada?.value,
    };

    if (especialidad.nombre?.length > 0) {
      this.especialidadService.Crear(especialidad);
    }
  }
}
  //#endregion
