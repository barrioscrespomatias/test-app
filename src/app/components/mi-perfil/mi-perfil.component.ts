import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';

//pdf
import * as moment from 'moment';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Turno } from 'src/app/interfaces/turno';
import { slideAnimation } from '../../animation';
import { TablaHistoriasClinicasComponent } from '../tabla-historias-clinicas/tabla-historias-clinicas.component';
import { GrillaHorariosComponent } from '../profesional/grilla-horarios/grilla-horarios.component';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav/nav.component';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css'],
  animations: [slideAnimation],
  standalone: true,
  imports: [CommonModule,
            TablaHistoriasClinicasComponent, 
            GrillaHorariosComponent, 
            FormsModule, 
            ReactiveFormsModule,
            NavComponent
          ],
  providers: [],
  schemas: []
})
export class MiPerfilComponent {

  constructor(
    private firebaseService: FirebaseAuthService,
    private usuarioService: UsuarioService,
  ) {}

  usuario!: any;
  email: string = this.firebaseService.userName;
  form!: FormGroup;
  isLogged: boolean = false;

  estadoActual: string = 'estadoInicial';

  cambiarEstado() {
    this.estadoActual = 'estadoFinal';
  }

  //#region Hooks
  async ngOnInit() {

    

    await this.usuarioService.getUsuario(this.email).then((usuario: any) => {
      this.usuario = usuario;
    });

    if(this.usuario)
    {
      this.form = new FormGroup({  
        nombre: new FormControl(this.usuario?.nombre),
        apellido: new FormControl(this.usuario?.apellido),         
        mail: new FormControl(this.usuario?.mail),
        dni: new FormControl(this.usuario?.dni),
        edad: new FormControl(this.usuario?.edad),      
        obra_social: new FormControl(this.usuario?.obraSocial),      
         
      });
    }
    await this.checkLoggedIn();
  }   


  //#endregion

  //#region Getters
  get nombre() {
    return this.form.get('nombre');
  }

  get apellido() {
    return this.form.get('apellido');
  }

  get mail() {
    return this.form.get('mail');
  }

  get dni() {
    return this.form.get('dni');
  }

  get edad() {
    return this.form.get('edad');
  }

  get obra_social() {
    return this.form.get('obra_social');
  }

  //#endregion


  //#region  pdf

  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
  }

  async DescargarPDF() {

    const data: Turno[][] = this.usuario.turnos.map((usuario: { dni: string; nombre: string; apellido: string; mail: string; perfil: string; habilitado: boolean }) => {
      let habilitado = usuario.habilitado ? 'si' : 'no';
    
        return [usuario.dni, usuario.nombre, usuario.apellido, usuario.mail, usuario.perfil, habilitado];
    });
  
    const headers: string[] = ['Dni', 'Nombre', 'Apellido', 'Mail', 'Perfil', 'Habilitado'];

    const documentDefinition: any = {
      header: `Informe... ${moment().format('DD/MM/YYYY')}`,
      footer: (currentPage: number, pageCount: number) => {
        return {
          text: `Página ${currentPage} de ${pageCount}`,
          alignment: 'center',
        };
      },      
      content: [
        {
          image: await this.getBase64ImageFromURL('assets/img/logo_matcres.png'),
          width: 50, // Ancho de la imagen en puntos (ajusta según tus necesidades)
          height: 50, // Alto de la imagen en puntos (ajusta según tus necesidades)
          alignment: 'center', // Centra la imagen horizontalmente
          margin: [0, 0, 0, 10], // Márgenes superiores e inferiores de la imagen
          style : 'header'
        },
        { text: 'Usuarios' },
        
        {
          table: {
            headerRows: 1,
            widths: ['10%', '15%', '15%', '30%', '20%', '10%'],
            body: [
              headers,
              ...data,
            ],
          },
          style: 'tableStyle', // Aplica el estilo de la tabla
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 10, 0, 10], // Ajusta los valores de margen según tus necesidades
        },
        tableStyle: {
          fontSize: 8, // Ajusta el tamaño de letra de la tabla
        },
      },
    };
  
    // Generar el documento PDF
    const pdfBuffer = pdfMake.createPdf(documentDefinition,undefined,undefined,pdfFonts.pdfMake.vfs).getBuffer((buffer: any) => {
      // Descargar el archivo PDF
      this.savePDFFile(buffer, 'usuarios.pdf');
    });
  }

  async getBase64ImageFromURL(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);

        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };

      img.onerror = () => {
        reject(new Error('No se pudo cargar la imagen'));
      };

      img.src = url;
    });
  }

  savePDFFile(buffer: ArrayBuffer, fileName: string) {
    const data = new Blob([buffer], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(data);
  
    // Crear un enlace de descarga y hacer clic en él
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  
    // Liberar la URL del objeto
    window.URL.revokeObjectURL(url);
  }

  //#endregion

}
