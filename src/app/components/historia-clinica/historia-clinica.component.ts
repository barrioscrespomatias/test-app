import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HistoriaClinicaComponent {
  //#region Propiedades
  @Input() turnoRecibido: any;
  form!: FormGroup;

  mostrarParametroDinamicoUno : boolean = false;
  mostrarParametroDinamicoDos : boolean = false;
  mostrarParametroDinamicoTres : boolean = false;

  //#endregion

  //#region Constructor
  constructor(private turnoService: TurnoService) {}

  //#endregion

  //#region Hooks
  async ngOnInit() {
    this.ActualizarFormulario();    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['turnoRecibido'] && this.turnoRecibido) {
      this.ActualizarFormulario();
    }
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
  ConvertirFecha(fecha: any) {
    return new Date(fecha.seconds * 1000);
  }

  // MostrarParametrosDinamicos() {
  //   if(!this.mostrarParametroUno && !this.mostrarParametroDos && !this.mostrarParametroTres)
  //     this.mostrarParametroUno = true;
  //   else if(!this.mostrarParametroDos && !this.mostrarParametroTres)
  //     this.mostrarParametroDos = true;
  //   else if(!this.mostrarParametroTres)
  //     this.mostrarParametroTres = true;
  // }

  private ActualizarFormulario() {
    if(this.turnoRecibido?.historia_clinica?.length == 0)
    {
      this.form = new FormGroup({
      resena: new FormControl(this.turnoRecibido?.resena, [Validators.pattern('^[a-zA-Z]+$')]),
      diagnostico: new FormControl(this.turnoRecibido?.diagnostico, [Validators.pattern('^[a-zA-Z]+$')]),      
      altura: new FormControl(this.turnoRecibido?.altura, [Validators.pattern('^[a-zA-Z]+$')]),      
      peso: new FormControl(this.turnoRecibido?.peso, [Validators.min(0), Validators.max(200,)]),      
      temperatura: new FormControl(this.turnoRecibido?.temperatura, [Validators.pattern('^[a-zA-Z]+$')]),      
      presion: new FormControl(this.turnoRecibido?.presion, [Validators.minLength(0), Validators.maxLength(5)]),      
    });
    }
    else if(this.turnoRecibido?.historia_clinica?.length == 1)
    {
      this.form = new FormGroup({  
        resena: new FormControl(this.turnoRecibido?.resena, [Validators.pattern('^[a-zA-Z]+$')]),
        diagnostico: new FormControl(this.turnoRecibido?.diagnostico, [Validators.pattern('^[a-zA-Z]+$')]),         
        clave_parametro_dinamico_1: new FormControl(this.turnoRecibido?.historia_clinica[0].clave != '' ? this.turnoRecibido?.historia_clinica[0].clave : '', [Validators.pattern('^[a-zA-Z]+$')]),
        valor_parametro_dinamico_1: new FormControl(this.turnoRecibido?.historia_clinica[0].valor != '' ? this.turnoRecibido?.historia_clinica[0].valor : '', [Validators.pattern('^[a-zA-Z]+$')]),
        altura: new FormControl(this.turnoRecibido?.altura, [Validators.pattern('^[a-zA-Z]+$')]),      
        peso: new FormControl(this.turnoRecibido?.peso, [Validators.min(0), Validators.max(200,)]),      
        temperatura: new FormControl(this.turnoRecibido?.temperatura, [Validators.pattern('^[a-zA-Z]+$')]),      
        presion: new FormControl(this.turnoRecibido?.presion, [Validators.minLength(0), Validators.maxLength(5)]),      
      });
      this.mostrarParametroDinamicoUno = true;
      this.mostrarParametroDinamicoDos = false;
      this.mostrarParametroDinamicoTres = false;
    }
    else if(this.turnoRecibido?.historia_clinica?.length == 2)
    {
      this.form = new FormGroup({ 
        resena: new FormControl(this.turnoRecibido?.resena, [Validators.pattern('^[a-zA-Z]+$')]),
        diagnostico: new FormControl(this.turnoRecibido?.diagnostico, [Validators.pattern('^[a-zA-Z]+$')]),          
        clave_parametro_dinamico_1: new FormControl(this.turnoRecibido?.historia_clinica[0].clave != '' ? this.turnoRecibido?.historia_clinica[0].clave : '', [Validators.pattern('^[a-zA-Z]+$')]),
        clave_parametro_dinamico_2: new FormControl(this.turnoRecibido?.historia_clinica[1].clave != '' ? this.turnoRecibido?.historia_clinica[1].clave : '', [Validators.pattern('^[a-zA-Z]+$')]),
        valor_parametro_dinamico_1: new FormControl(this.turnoRecibido?.historia_clinica[0].valor != '' ? this.turnoRecibido?.historia_clinica[0].valor : '', [Validators.pattern('^[a-zA-Z]+$')]),
        valor_parametro_dinamico_2: new FormControl(this.turnoRecibido?.historia_clinica[1].valor != '' ? this.turnoRecibido?.historia_clinica[1].valor : '', [Validators.pattern('^[a-zA-Z]+$')]),
        altura: new FormControl(this.turnoRecibido?.altura, [Validators.pattern('^[a-zA-Z]+$')]),      
        peso: new FormControl(this.turnoRecibido?.peso, [Validators.min(0), Validators.max(200,)]),      
        temperatura: new FormControl(this.turnoRecibido?.temperatura, [Validators.pattern('^[a-zA-Z]+$')]),      
        presion: new FormControl(this.turnoRecibido?.presion, [Validators.minLength(0), Validators.maxLength(5)]),      
      });

      this.mostrarParametroDinamicoUno = true;
      this.mostrarParametroDinamicoDos = true;
      this.mostrarParametroDinamicoTres = false;
    }
    else{
      this.form = new FormGroup({  
        resena: new FormControl(this.turnoRecibido?.resena, [Validators.pattern('^[a-zA-Z]+$')]),
        diagnostico: new FormControl(this.turnoRecibido?.diagnostico, [Validators.pattern('^[a-zA-Z]+$')]),         
        clave_parametro_dinamico_1: new FormControl(this.turnoRecibido?.historia_clinica[0].clave != '' ? this.turnoRecibido?.historia_clinica[0].clave : '', [Validators.pattern('^[a-zA-Z]+$')]),
        clave_parametro_dinamico_2: new FormControl(this.turnoRecibido?.historia_clinica[1].clave != '' ? this.turnoRecibido?.historia_clinica[1].clave : '', [Validators.pattern('^[a-zA-Z]+$')]),
        clave_parametro_dinamico_3: new FormControl(this.turnoRecibido?.historia_clinica[2].clave != '' ? this.turnoRecibido?.historia_clinica[2].clave : '', [Validators.pattern('^[a-zA-Z]+$')]),
        valor_parametro_dinamico_1: new FormControl(this.turnoRecibido?.historia_clinica[0].valor != '' ? this.turnoRecibido?.historia_clinica[0].valor : '', [Validators.pattern('^[a-zA-Z]+$')]),
        valor_parametro_dinamico_2: new FormControl(this.turnoRecibido?.historia_clinica[1].valor != '' ? this.turnoRecibido?.historia_clinica[1].valor : '', [Validators.pattern('^[a-zA-Z]+$')]),
        valor_parametro_dinamico_3: new FormControl(this.turnoRecibido?.historia_clinica[2].valor != '' ? this.turnoRecibido?.historia_clinica[2].valor : '', [Validators.pattern('^[a-zA-Z]+$')]),      
        altura: new FormControl(this.turnoRecibido?.altura, [Validators.pattern('^[a-zA-Z]+$')]),      
        peso: new FormControl(this.turnoRecibido?.peso, [Validators.min(0), Validators.max(200,)]),      
        temperatura: new FormControl(this.turnoRecibido?.temperatura, [Validators.pattern('^[a-zA-Z]+$')]),      
        presion: new FormControl(this.turnoRecibido?.presion, [Validators.minLength(0), Validators.maxLength(5)]),      
      });

      this.mostrarParametroDinamicoUno = true;
      this.mostrarParametroDinamicoDos = true;
      this.mostrarParametroDinamicoTres = true;
    }   
  }
  //#endregion
}
