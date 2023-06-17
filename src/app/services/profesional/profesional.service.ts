import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { FirebaseAuthService } from '../angularFire/angular-fire.service';
import { PerfilEnum } from 'src/app/enum/perfilEnum/perfil-enum';

@Injectable({
  providedIn: 'root',
})
export class ProfesionalService {
  // constructor(private firestore: Firestore,  private firebaseService: FirebaseAuthService) {}

  // public async guardar(profesional: Profesional, nuevoId : string) {
    
  //   const usuariosRef = collection(this.firestore, 'profesionales');

  //   await setDoc(doc(usuariosRef, nuevoId), {
  //     // Entity

  //     // id: string = "";
  //     // nombre: string = "";;
  //     // segundoNombre: string = "";;
  //     // fechaCreacion: Date = new Date();
  //     // ultimaModificacion: Date = new Date();
  //     // borrado: boolean = false;

  //     // Usuario

  //     // edad: string = "";
  //     // dni: string = "";
  //     // mail: string = "";
  //     // contrasena: string = "";
  //     // perfil: PerfilEnum = 0;

  //     //Empleado

  //     // horarioTrabajo

  //     // Profesional

  //     // calificacionPromedio: number = 0;

  //     //Navegacion
  //     // especialidad: Especialidad[] = new Array(); // para navegar.
  //     // listadoTurnos: Turno[] = new Array(); //para navegar.
  //     // listadoImagenes: Imagen[] = new Array(); //para navegar.

  //     id: nuevoId,
  //     nombre: profesional.nombre,
  //     segundoNombre: profesional.segundoNombre,
  //     fechaCreacion: profesional.fechaCreacion,
  //     ultimaModificacion: profesional.ultimaModificacion,
  //     borrado: profesional.borrado,

  //     edad: profesional.edad,
  //     dni: profesional.dni,
  //     mail: profesional.mail,
  //     contrasena: profesional.contrasena,
  //     perfil: profesional.perfil,

  //     horarioTrabajo: profesional.horarioTrabajo, // al momento no convfence

  //     calificacionPromedio: profesional.calificacionPromedio,
  //   });

  //   alert('profesioanl creado')

  //   // this.firebaseService.SignUp(profesional.mail, profesional.contrasena);
  //   // alert('user creado')
    
  // }

  // async TraerPorDni(dni: string) {
    
  //   const coleccion = collection(this.firestore, 'especialidades');
  //   const consulta = query(coleccion, where('dni', '==', dni));
  //   return collectionData(consulta);
  // }

  // async traerUno(usuarioId:string) {
  //   // Traer uno especifico
  //   const coleccion = collection(this.firestore, 'profesionales');
  //   const documento = doc(coleccion, usuarioId);
  //   console.log("profeisonal en DB")
  //   console.log(documento)

  //   // if (docSnap.exists()) {
  //   //   console.log('Document data:', docSnap.data());
  //   // } else {
  //   //   // docSnap.data() will be undefined in this case
  //   //   console.log('No such document!');
  //   // }
  // }

  // modificar(usuario: Profesional) {
  //   const coleccion = collection(this.firestore, 'profesionales');
  //   const documento = doc(coleccion, '031a7d54-3187-4aad-aa6f-1ee2ed65f00f');
  //   updateDoc(documento, { ...usuario });
  // }

  // async TraerTodo() {
  //   var fecha : Date = new Date()
  //   const coleccion = collection(this.firestore, 'profesionales');
  //   // const consulta = query(coleccion, where('borrado', '!=', false));
  //   const consulta = query(coleccion, where('fechaCreacion', '<', fecha));
  //   return collectionData(consulta);
  // }
}
