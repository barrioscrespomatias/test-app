import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { EspecialidadService } from 'src/app/servicios/entidades/especialidad/especialidad.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css'],
})
export class GestionUsuariosComponent {
  //#region Propiedades
  componenteVisible: string = 'grilla-horarios';

  //#endregion

  //#region Constructor

  constructor() {}

  //#endregion
}
