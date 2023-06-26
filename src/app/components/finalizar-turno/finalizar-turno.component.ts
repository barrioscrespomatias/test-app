import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EstadoEnum } from 'src/app/enum/estadoTurnoEnum/estado-turno-enum';
import { HistoriaClinica } from 'src/app/interfaces/historiaClinica';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';

@Component({
  selector: 'app-finalizar-turno',
  templateUrl: './finalizar-turno.component.html',
  styleUrls: ['./finalizar-turno.component.css'],
})
export class FinalizarTurnoComponent {
  //#region Propiedades
  @Input() turnoRecibido: any;
  form!: FormGroup;
  mostrarParametroUno : boolean = false;
  mostrarParametroDos : boolean = false;
  mostrarParametroTres : boolean = false;

  //#endregion

  //#region Constructor
  constructor(private turnoService: TurnoService) {}

  //#endregion

  //#region Hooks

  async ngOnInit() {
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
    this.turnoRecibido.estado = EstadoEnum.Realizado;
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

    //  historia_clinica = [
    //    { clave: 'Caries', valor: '4' },
    //    { clave: 'Cantidad dientes', valor: '22' },
    //    { clave: 'Limpieza', valor: 'Si' },
    //  ];


    this.turnoRecibido.historia_clinica = historia_clinica;
     this.turnoService.Modificar(this.turnoRecibido.docRef, this.turnoRecibido);
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
