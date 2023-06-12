import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Subscription, map } from 'rxjs';
import { Profesional } from 'src/app/clases/personas/profesional/profesional';
import { ProfesionalService } from 'src/app/services/profesional/profesional.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  constructor(
    private profesionalService: ProfesionalService,
    private firestore: Firestore,
  ) {}


  suscripcionProfesionalService!: Subscription;
  profesionales: any;

  async ngOnInit() {

    this.profesionales = (await this.profesionalService.TraerTodo()).pipe(
      map((response: any[]) =>
        response.map((profesionaldDb) => {
          const profesionalClass: Profesional = {

            // entity
            id: profesionaldDb.id,
            nombre: profesionaldDb.nombre,
            segundoNombre: profesionaldDb.segundoNombre,
            borrado: profesionaldDb.borrado,
            fechaCreacion: profesionaldDb.fechaCreacion,
            ultimaModificacion: profesionaldDb.ultimaModificacion,

            // Usuario
            edad: profesionaldDb.edad,
            dni: profesionaldDb.dni,
            mail: profesionaldDb.mail,
            contrasena: profesionaldDb.contrasena,
            perfil: profesionaldDb.perfil,

            //Empleado
            horarioTrabajo: profesionaldDb.horarioTrabajo,

            // Profesional
            calificacionPromedio: profesionaldDb.calificacionPromedio,

          };
          return profesionalClass;
        })
      )
    );

    // END NG ON INIT
  }

  

}
