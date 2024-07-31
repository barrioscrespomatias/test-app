import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { FileService } from 'src/app/servicios/file/file.service';
import { EspecialidadV2Service } from 'src/app/servicios/v2/especialidad-v2.service';

@Component({
  selector: 'app-agregar-especialidad',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './agregar-especialidad.component.html',
  styleUrl: './agregar-especialidad.component.css'
})
export class AgregarEspecialidadComponent {
 //#region Propiedades
 form!:FormGroup;
 imagenEspecialidad:string = '';
 //#endregion

  //#region Constructor
  
  constructor(
   private especialidadService: EspecialidadV2Service,
   private fileService: FileService,
 ) {}

  //#endregion

 async ngOnInit() {
     
  this.form = new FormGroup({
    especialidad: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
    imagen_especialidad: new FormControl(''),
  });
}



get especialidad() {
  return this.form.get('especialidad');
}

get imagen_especialidad() {
  return this.form.get('imagen_especialidad');
}


 //#region Metodos
   async AgregarEspecialidad(){
    var path = await this.ObtenerArchivo(this.imagenEspecialidad);

    const nuevaEspecialidad: Especialidad = {
      nombre: this.especialidad?.value,
      path: path
    };
  
     this.especialidadService.guardarEspecialidad(nuevaEspecialidad);
   }

   ConvertirFecha(fecha:any){
     return new Date(fecha.seconds * 1000);
   }

   SubirArchivo(e: any) {
    this.imagenEspecialidad = `${this.getFecha()}_${1}`; 

    const storage = getStorage();
    const storageRef = ref(storage, this.imagenEspecialidad);

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
 //#endregion
}
