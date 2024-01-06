import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EstadoEnum } from 'src/app/enum/estadoTurnoEnum/estado-turno-enum';
import { HistoriaClinica } from 'src/app/interfaces/historiaClinica';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';

@Component({
  selector: 'app-finalizar-turno',
  templateUrl: './finalizar-turno.component.html',
  styleUrls: ['./finalizar-turno.component.css'],
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
  pacienteAtendido : any;
  mail: string = this.firebaseService.userName;
  usuario: any;
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
      valor_parametro_dinamico_1: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      valor_parametro_dinamico_2: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      valor_parametro_dinamico_3: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),      
      altura: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),      
      peso: new FormControl('', [Validators.min(0), Validators.max(200,)]),      
      temperatura: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),      
      presion: new FormControl('', [Validators.minLength(0), Validators.maxLength(5)]),      
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

    var historia_clinica: HistoriaClinica[] = [];


    if (
      this.clave_parametro_dinamico_1?.value != '' &&
      this.clave_parametro_dinamico_2?.value != '' &&
      this.clave_parametro_dinamico_3?.value != ''
    ) {
      historia_clinica = [
        {
          clave: this.clave_parametro_dinamico_1?.value,
          valor: this.valor_parametro_dinamico_1?.value,
        },
        {
          clave: this.clave_parametro_dinamico_2?.value,
          valor: this.valor_parametro_dinamico_2?.value,
        },
        {
          clave: this.clave_parametro_dinamico_3?.value,
          valor: this.valor_parametro_dinamico_3?.value,
        },
      ];
    } else if (
      this.clave_parametro_dinamico_1?.value != '' &&
      this.clave_parametro_dinamico_2?.value != ''
    ) {
      historia_clinica = [
        {
          clave: this.clave_parametro_dinamico_1?.value,
          valor: this.valor_parametro_dinamico_1?.value,
        },
        {
          clave: this.clave_parametro_dinamico_2?.value,
          valor: this.valor_parametro_dinamico_2?.value,
        },
      ];
    } else if (this.clave_parametro_dinamico_1?.value != '') {
      historia_clinica = [
        {
          clave: this.clave_parametro_dinamico_1?.value,
          valor: this.valor_parametro_dinamico_1?.value,
        },
      ];
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
  //#endregion
}
