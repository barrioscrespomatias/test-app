import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { EncuestaSatisfaccion } from 'src/app/interfaces/encuesta-satisfaccion';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';
import { EncuestaSatisfaccionService } from 'src/app/servicios/v2/encuesta-satisfaccion.service';
import * as moment from 'moment';

@Component({
  selector: 'app-encuesta-satisfaccion',
  templateUrl: './encuesta-satisfaccion.component.html',
  styleUrls: ['./encuesta-satisfaccion.component.css'],
  imports: [NgbRatingModule,
            FormsModule, 
            ReactiveFormsModule, 
            CommonModule
           ],
  standalone:true,
})
export class EncuestaSatisfaccionComponent implements OnInit {

  constructor(private encuestaSatisfaccionService: EncuestaSatisfaccionService,
    private fb: FormBuilder,
    private usuarioService:UsuarioService,
    private firebaseService: FirebaseAuthService,) {}


  @Input() turnoRecibido: any;
  form!: FormGroup;
  currentUser:any;
  mail: string = this.firebaseService.userName;

  checkboxGroup!: FormGroup;
  checkboxes = [{
      name: 'Puntualidad',
      value: 'Puntualidad'
  }, 
  {
      name: 'Claridad Profesional',
      value: 'Claridad Profesional'
  },
  {
      name: 'Resolucion',
      value: 'Resolucion'
  },
  {
      name: 'Instalaciones',
      value: 'Instalaciones'
  },
];



  async ngOnInit() {
    this.checkboxGroup = this.fb.group({
      checkboxes: this.fb.array(this.checkboxes.map(x => false))      
  });

    this.form = new FormGroup({
      amabilidad: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      calificacionGeneral: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      observaciones: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      simplicidadTurnos: new FormControl(false),
      recomendacion: new FormControl(0),
      aspectosDestacar: new FormArray([]),
    });

    this.currentUser = await this.usuarioService.getUsuario(this.mail);
  }

  submit() {

    const aspectosDestacarSeleccionados = this.checkboxGroup.controls['checkboxes'].value
    .map((checked: boolean, index: number) => checked ? this.checkboxes[index].value : null)
    .filter((value: null) => value !== null);

    const encuestaSatisfaccion: EncuestaSatisfaccion = {
      userEmail:this.currentUser.docRef,
      calificacionGeneral: this.calificacionGeneral?.value,
      recomendacion: this.recomendacion?.value,
      simplicidadTurnos: this.simplicidadTurnos?.value,
      amabilidad : this.amabilidad?.value,
      aspectosDestacar : aspectosDestacarSeleccionados,
      observacion:this.observaciones?.value,
      fecha: moment().toDate(),   
    };


    this.encuestaSatisfaccionService.guardarencuestaSatisfaccion(encuestaSatisfaccion);
  }

  get amabilidad() {
    return this.form.get('amabilidad');
  }

  get calificacionGeneral() {
    return this.form.get('calificacionGeneral');
  }

  get aspectosDestacar() {
    return this.form.get('aspectosDestacar');
  }

  get recomendacion() {
    return this.form.get('recomendacion');
  }

  get observaciones() {
    return this.form.get('observaciones');
  }

  get simplicidadTurnos() {
    return this.form.get('simplicidadTurnos');
  }
}
