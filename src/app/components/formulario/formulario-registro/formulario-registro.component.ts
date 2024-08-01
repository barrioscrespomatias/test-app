//#region Imports
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, VERSION } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, map } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';
import { EspecialidadService } from 'src/app/servicios/entidades/especialidad/especialidad.service';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { SweetAlertService } from 'src/app/servicios/sweet-alert/sweet-alert.service';
import { HorarioEspecialidad } from 'src/app/interfaces/horarioEspecialidad';
import { FileService } from 'src/app/servicios/file/file.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavComponent } from '../../nav/nav/nav.component';
import { CustomCaptchaComponent } from '../../custom-captcha/custom-captcha.component';
import { AgregarEspecialidadComponent } from "../../agregar-especialidad/agregar-especialidad.component";
import { Especialidad } from 'src/app/interfaces/especialidad';

//#endregion
@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.css'],
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NavComponent,
    CustomCaptchaComponent, AgregarEspecialidadComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
  fotoTres: string = '';
  nuevaEspecialidad: string = '';
  especialidadHabilitada: boolean = false;
  captchaVerificado = false;

  //#region Captcha
  public version = VERSION.full;
  public recaptchaMode = 'v3';
  public reactiveForm: FormGroup = new FormGroup({
    recaptchaReactive: new FormControl(null, Validators.required),
  });
  public log: string[] = [];
  public declarativeFormCaptchaValue: string = '';
  onlyLanguage: boolean = true;
  languageEnabled: boolean = true;

  //#endregion



  resultado!: string;

  //#endregion

  //#region Constructor
  constructor(
    private especialidadService: EspecialidadService,
    private firestore: Firestore,
    private usuarioServicio: UsuarioService,
    private sweetAlertServicio: SweetAlertService,
    // private recaptchaV3Service: ReCaptchaV3Service,
    private fileService: FileService,
    public router: Router, 
    private usuarioService: UsuarioService,
    private translate: TranslateService,
  ) {}

  //#endregion

  //#region NG Hooks

  
  receiveMessage(idioma: any) {
    this.translate.setDefaultLang(idioma);
  }

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
      nombre: new FormControl('', [
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z ]*')]),
      apellido: new FormControl('', [
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z ]*')]),
      edad: new FormControl('', [
        Validators.required, 
        Validators.min(1), 
        Validators.max(120), 
        Validators.pattern('\\d+')]),
      dni: new FormControl('', [
        Validators.required, 
        Validators.min(1000), 
        Validators.max(100000000), 
        Validators.pattern('\\d+')]),
        mail: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
        ]),
      contrasena: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>_])[a-zA-Z\\d!@#$%^&*(),.?":{}|<>]{6,}$')
      ]),
      imagenPerfil1: new FormControl('', Validators.required),
      imagenPerfil2: new FormControl(''),
      imagen_especialidad: new FormControl(''),
      // obra_social: new FormControl('', [
      //   Validators.required, 
      //   Validators.minLength(2),
      //   Validators.maxLength(30),
      //   Validators.pattern('[a-zA-Z ]*')]),
        obra_social: new FormControl('', []),
      // especialidad: new FormControl('', [Validators.pattern('^[a-zA-Z]+$'), Validators.required]),
      especialidad: new FormControl('',),
      // perfil: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      perfil: new FormControl('', ),
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

  // get imagen_especialidad() {
  //   return this.form.get('imagen_especialidad');
  // }

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
  async CrearUsuario() {
    const horarioEspecialidad: HorarioEspecialidad[] = [];
    const profesionalesVisitados: string[] = [];
    const pacientesAtendidos: string[] = [];

    let url1: string = '';
    let url2: string = '';
    
    try {
      url1 = await this.ObtenerArchivo(this.fotoUno);
    } catch (error) {
    }
    
    try {
      url2 = await this.ObtenerArchivo(this.fotoDos);
    } catch (error) {
    }    

    const usuario: Usuario = {
      nombre: this.nombre?.value,
      apellido: this.apellido?.value,
      edad: this.edad?.value,
      dni: this.dni?.value,
      mail: this.mail?.value,
      contrasena: this.contrasena?.value,
      imagenPerfil1: url1,
      imagenPerfil2: url2,
      habilitado: (this.perfilRecibido == 'Paciente' || this.perfilRecibido == 'Administrador') ? true : false,
      perfil: this.perfilRecibido == 'Profesional' ? 'profesional' : this.perfilRecibido == 'Paciente' ? 'paciente' : 'administrador',
      obraSocial: this.obra_social?.value,
      especialidades: this.especialidad?.value,
      peso: 0,
      altura: 0,
      horarioEspecialidad: horarioEspecialidad,
      profesionalesVisitados: profesionalesVisitados,
      pacientesAtendidos: pacientesAtendidos,
    };

    debugger
    let respuesta = this.usuarioServicio.Crear(usuario);
    respuesta.then((response) => {
      if (response.valido) {
        this.sweetAlertServicio.MensajeExitoso("Usuario creado exitosamente")
        this.router.navigate(['']);
      } else {
        this.sweetAlertServicio.MensajeError("Verifique los campos ingresados")
      }      
    });

  }

  public FormularioConErrores(): boolean {
    let formIsInvalid = false;
    let errorMessage = 'Se encontraron errores en los siguientes campos:\n';

    // Recorrer los controles del formulario
    for (const controlName in this.form.controls) {
      if (this.form.controls.hasOwnProperty(controlName)) {
        const control = this.form.controls[controlName];
        
        // Verificar si el control tiene errores
        if (control.errors) {
          formIsInvalid = true;
          errorMessage += `${controlName}: ${this.getErrorMessage(control.errors)}\n`;

          // Imprimir los errores en la consola
          console.log(`Control: ${controlName}`, control.errors);
        }
      }
    }

    console.log("formulario invalido:")
    console.log(this.form.invalid)
    console.log("captcha verificado:")
    console.log(this.captchaVerificado)

    return this.form.invalid;
  }

  private getErrorMessage(errors: any): string {
    if (errors.required) {
      return 'Este campo es obligatorio.';
    } else if (errors.minlength) {
      return `El valor es demasiado corto. Longitud mínima: ${errors.minlength.requiredLength}.`;
    } else if (errors.maxlength) {
      return `El valor es demasiado largo. Longitud máxima: ${errors.maxlength.requiredLength}.`;
    } else if (errors.pattern) {
      return 'El valor no coincide con el patrón requerido.';
    } else if (errors.email) {
      return 'El formato del correo electrónico no es válido.';
    } else {
      return 'Error desconocido.';
    }
  }

  //#region  foto
  SubirArchivo(e: any, imgNum: number) {
    if (imgNum == 1) 
    {
      this.fotoUno = `${this.getFecha()}_${1}`;
    } 
    else if (imgNum == 2) 
    {
      this.fotoDos = `${this.getFecha()}_${2}`;
    }
    else if(imgNum == 3)
    {
      this.fotoTres = `${this.getFecha()}_${3}`;
    }

    const storage = getStorage();
    const storageRef = ref(storage, imgNum == 1 ? this.fotoUno : imgNum == 2 ? this.fotoDos : this.fotoTres);

    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      
    });
  }

ObtenerArchivo(nombreArchivo: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    this.fileService.ObtenerURLImagen(nombreArchivo)
      .then((url) => {
        resolve(url);
      })
      .catch((error) => {
        reject(error);
      });
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

  onCaptchaVerified(captchaValue: boolean) {
    this.captchaVerificado = captchaValue;
  }

  //#endregion

}
  //#endregion
