import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';

import {ThemePalette} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatIcon } from '@angular/material/icon';
import { MatRadioButton, MatRadioGroup, MatRadioModule } from '@angular/material/radio';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-finalizar-turno',
  templateUrl: './finalizar-turno.component.html',
  styleUrls: ['./finalizar-turno.component.css'],
  standalone: true,
  imports: [CommonModule, 
            FormsModule, 
            ReactiveFormsModule,
            MatSliderModule, 
            MatIcon, 
            MatRadioButton, 
            MatCardContent, 
            MatLabel, 
            MatInput, 
            MatRadioGroup, 
            MatSlideToggleModule,
            MatButtonModule, 
            MatCardModule, 
            MatRadioModule, 
            MatCheckboxModule, 
            MatFormFieldModule, 
            MatDivider],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FinalizarTurnoComponent {

    //#region Constructor
    constructor(private turnoService: TurnoService,
      private usuarioService: UsuarioService,
      private firebaseService: FirebaseAuthService,
) {}

//#endregion

  //#region Propiedades
  @Input() turnoRecibido: any;
  form!: FormGroup;
  mostrarParametroUno : boolean = false;
  mostrarParametroDos : boolean = false;
  mostrarParametroTres : boolean = false;
  mostrarParametroCuatro : boolean = false;
  mostrarOpcionParametroCuatro : boolean = true;
  mostrarParametroCinco : boolean = false;
  mostrarOpcionParametroCinco : boolean = true;
  mostrarParametroSeis : boolean = false;
  mostrarOpcionParametroSeis : boolean = true;
  mostrarOpcionesDinamicas : boolean = false;
  agregarMasParametrosButton : boolean = true;
  mostrarBotonAgregar : boolean = true;
  pacienteAtendido : any;
  mail: string = this.firebaseService.userName;
  usuario: any;

  //SlideToggle
  color: ThemePalette = 'accent';
  // checked = false;
  disabled = false;

  //SliderComponent
  disabledSlider = false;
  max = 10;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;

  //#endregion



  //#region Hooks

  async ngOnInit() {

    this.usuarioService.getUsuario(this.mail).then((usuario: any) => {
      this.usuario = usuario;
    });

    this.pacienteAtendido = this.usuarioService.getUsuario(this.turnoRecibido.paciente);

    this.usuarioService.getUsuario(this.turnoRecibido.paciente).then((paciente: any) => {
      this.pacienteAtendido = paciente;
    });

    this.form = new FormGroup({
      resena: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      diagnostico: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      historia_clinica: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      clave_parametro_dinamico_1: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      clave_parametro_dinamico_2: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      clave_parametro_dinamico_3: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      clave_parametro_dinamico_4: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      clave_parametro_dinamico_5: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      clave_parametro_dinamico_6: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      valor_parametro_dinamico_1: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      valor_parametro_dinamico_2: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      valor_parametro_dinamico_3: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),      
      valor_parametro_dinamico_4: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),      
      valor_parametro_dinamico_5: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),      
      valor_parametro_dinamico_6: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),      
      altura: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),      
      peso: new FormControl('', [Validators.min(0), Validators.max(200,)]),      
      temperatura: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),      
      presion: new FormControl('', [Validators.minLength(0), Validators.maxLength(5)]),      
      necesitaNuevaConsulta: new FormControl(''),      
      numeroDeConsulta: new FormControl('', [Validators.minLength(0), Validators.maxLength(100)]),      
      valoracionPaciente: new FormControl('', [Validators.minLength(0), Validators.maxLength(100)]),      
      dinamicType: new FormControl('',),      
    });    
  }

  //#endregion

  //#region Getters
  get resena() {
    return this.form.get('resena');
  }

  get diagnostico() {
    return this.form.get('diagnostico');
  }

  get altura() {
    return this.form.get('altura');
  }

  get peso() {
    return this.form.get('peso');
  }

  get temperatura() {
    return this.form.get('temperatura');
  }

  get presion() {
    return this.form.get('presion');
  }

  get clave_parametro_dinamico_1() {
    return this.form.get('clave_parametro_dinamico_1');
  }

  get valor_parametro_dinamico_1() {
    return this.form.get('valor_parametro_dinamico_1');
  }

  get clave_parametro_dinamico_2() {
    return this.form.get('clave_parametro_dinamico_2');
  }

  get valor_parametro_dinamico_2() {
    return this.form.get('valor_parametro_dinamico_2');
  }

  get clave_parametro_dinamico_3() {
    return this.form.get('clave_parametro_dinamico_3');
  }

  get valor_parametro_dinamico_3() {
    return this.form.get('valor_parametro_dinamico_3');
  }

  get clave_parametro_dinamico_4() {
    return this.form.get('clave_parametro_dinamico_4');
  }

  get valor_parametro_dinamico_4() {
    return this.form.get('valor_parametro_dinamico_4');
  }

  get clave_parametro_dinamico_5() {
    return this.form.get('clave_parametro_dinamico_5');
  }

  get valor_parametro_dinamico_5() {
    return this.form.get('valor_parametro_dinamico_5');
  }

  get clave_parametro_dinamico_6() {
    return this.form.get('clave_parametro_dinamico_6');
  }

  get valor_parametro_dinamico_6() {
    return this.form.get('valor_parametro_dinamico_6');
  }

  get dinamicType() {
    return this.form.get('dinamicType');
  }

  //#endregion

  //#region Metodos
  FinalizarTurno() {
    this.turnoRecibido.estado = "Realizado";
    this.turnoRecibido.resena = this.resena?.value;
    this.turnoRecibido.diagnostico = this.diagnostico?.value;  
    this.turnoRecibido.altura = this.altura?.value;
    this.turnoRecibido.peso = this.peso?.value;
    this.turnoRecibido.temperatura = this.temperatura?.value;
    this.turnoRecibido.presion = this.presion?.value;

// Define un tipo para los nombres de las propiedades dinámicas
  type DynamicParamName = 'clave_parametro_dinamico_1' | 'clave_parametro_dinamico_2' | 'clave_parametro_dinamico_3' | 'clave_parametro_dinamico_4' | 'clave_parametro_dinamico_5' | 'clave_parametro_dinamico_6';

  let historia_clinica = [];
    // Itera sobre los 6 parámetros dinámicos
    for (let i = 1; i <= 6; i++) {
        let clave = this[`clave_parametro_dinamico_${i}` as DynamicParamName]?.value;
        let valor = this[`valor_parametro_dinamico_${i}` as DynamicParamName]?.value;

        if (clave && valor) {
            historia_clinica.push({ clave, valor });
        }
    }

    //Turno
    this.turnoRecibido.altura = this.altura?.value;
    this.turnoRecibido.peso = this.peso?.value;
    this.turnoRecibido.historia_clinica = historia_clinica;
    this.turnoService.Modificar(this.turnoRecibido.docRef, this.turnoRecibido);

    //Paciente
    this.pacienteAtendido.altura = this.altura?.value;
    this.pacienteAtendido.peso = this.peso?.value;

     //Paciente
     if (this.pacienteAtendido.profesionalesVisitados.indexOf(this.mail) === -1) 
     {
       this.pacienteAtendido.profesionalesVisitados.push(this.mail);
       var respuesta = this.usuarioService.Modificar(this.pacienteAtendido.docRef,this.pacienteAtendido);
     }

    //Profesional
    if (this.usuario.pacientesAtendidos.indexOf(this.pacienteAtendido.docRef) === -1) 
    {
      this.usuario.pacientesAtendidos.push(this.pacienteAtendido.docRef);
      var respuesta = this.usuarioService.Modificar(this.mail,this.usuario);
    }
  }

  ConvertirFecha(fecha: any) {
    return new Date(fecha.seconds * 1000);
  }

  AgregarParametro() {
    if(!this.mostrarParametroUno && !this.mostrarParametroDos && !this.mostrarParametroTres)
      this.mostrarParametroUno = true;
    else if(!this.mostrarParametroDos && !this.mostrarParametroTres)
      this.mostrarParametroDos = true;
    else if(!this.mostrarParametroTres)
      this.mostrarParametroTres = true;
  }

  AgregarMasParametros(){
    let dinamicType = this.dinamicType?.value;

    if(dinamicType == 'slider'){
      this.mostrarParametroCuatro = true;
      this.mostrarOpcionParametroCuatro = false;

    }
    else if(dinamicType == 'numero'){
      this.mostrarParametroCinco = true;
      this.mostrarOpcionParametroCinco = false;

    }
    else if(dinamicType = 'toggle'){
      this.mostrarParametroSeis = true;
      this.mostrarOpcionParametroSeis = false;
    }

    if(this.mostrarParametroCuatro && this.mostrarParametroCinco && this.mostrarParametroSeis)
      this.mostrarBotonAgregar = false;
  }

  ConfigurarParametrosDinamicos(){
    this.mostrarOpcionesDinamicas = !this.mostrarOpcionesDinamicas;
  }
  //#endregion
}
