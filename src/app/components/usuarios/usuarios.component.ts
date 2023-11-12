import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';
import { FileService } from 'src/app/servicios/file/file.service';
import { utils, writeFile } from 'xlsx';
import * as moment from 'moment';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { slideAnimation } from '../../animation';
import { Turno } from 'src/app/interfaces/turno';
import { FechaService } from 'src/app/helper/fecha/fecha.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  animations: [slideAnimation]
})
export class UsuariosComponent {

  constructor(
              private usuarioService: UsuarioService,
              private turnoService: TurnoService,
              private fileService : FileService,
              private fechaHelper: FechaService,
              private datePipe: DatePipe,
              ) {
  }  

  series = [];
  suscripcionUsuariosService!: Subscription;
  usuarios: any;
  turnos: any;
  usuariosSubscription:any;
  turnosSubscription:any;
  formularioRegistrarUsuarioVisible:boolean = false;

  estadoActual: string = 'estadoInicial';

  cambiarEstado() {
    this.estadoActual = 'estadoFinal';
  }

  async ngOnInit() {

    this.usuariosSubscription = (
      await this.usuarioService.TraerTodos()
    ).subscribe((usuarios) => {
      this.usuarios = usuarios
    });
    
    this.turnosSubscription = (
      await this.turnoService.TraerTodos()
    ).subscribe((turnos) => {
      this.turnos = turnos
    }); 
  }

  ngOnDestroy() {
    if (this.usuariosSubscription) {
      this.usuariosSubscription.unsubscribe();
    }

    if (this.turnosSubscription) {
      this.turnosSubscription.unsubscribe();
    }
  }

  CambiarEstado(usuario: Usuario) {
      usuario.habilitado = !usuario.habilitado;
      
    if (usuario.docRef != null)
      this.usuarioService.Modificar(usuario?.docRef, usuario);
  }

  PreparaParaDescargar(lista:any, name:string, nameData:string){
    console.log(lista)
    return lista.pipe.map((dato: { name: any; data: any[]; })=>{
       return {[name]:dato.name,[nameData]:dato.data[0]}
     })
   }

  DescargarExcel() {
    if(this.usuarios.length > 0){
      const data: Usuario[][] = 
      
      this.usuarios     
      .filter((usuario: { perfil: string }) => usuario.perfil == 'profesional') 
      .map((usuario: { dni: string; nombre: string; apellido: string; mail: string; perfil: string; habilitado: boolean }) => {
        let habilitado = usuario.habilitado ? 'si' : 'no';   
        
        return [usuario.dni, usuario.nombre, usuario.apellido, usuario.mail, usuario.perfil, habilitado];
      });   
      
      
      const headers: string[] = ['Dni','Nombre', 'Apellido', 'Mail', 'Perfil', 'Habilitado'];
  
      // Crear el libro de trabajo
      const workbook = utils.book_new();
      const worksheet = utils.aoa_to_sheet([headers, ...data]);
      utils.book_append_sheet(workbook, worksheet, 'Usuarios');
      
      // Generar el archivo Excel
      const excelBuffer = writeFile(workbook, 'usuarios.xlsx', { bookType: 'xlsx', type: 'buffer' });
      
      // Descargar el archivo Excel
      if(excelBuffer != undefined)      
      this.saveExcelFile(excelBuffer, 'usuarios.xlsx');
    }   
  }

  DescargarExcelTurnos(usuarioFiltrado: Usuario) {
    if(this.turnos.length > 0){
      const data: Turno[][] =       
      this.turnos     
      .filter((turno: { paciente: string, estado: string }) => turno.paciente == usuarioFiltrado.docRef && turno.estado == 'Realizado') 
      .map((turno: { especialidad: string; estado: string; paciente: string; profesional:string, diagnostico:string, fecha: Date }) => {
        let fecha:Date = this.fechaHelper.ConvertirFechaFirestore(turno.fecha); 
        
        let fechaFormateada : string|null;
        fechaFormateada = this.datePipe.transform(fecha, 'dd/MM/yyyy hh:mm a');
        
        return [fechaFormateada, turno.estado, turno.especialidad, turno.diagnostico, turno.paciente, turno.profesional];
      }); 
      
      console.log(data)
      
      
      const headers: string[] = ['Fecha','Estado', 'Especialidad', 'Diagnostico', 'Paciente', 'Profesional'];
  
      // Crear el libro de trabajo
      const workbook = utils.book_new();
      const worksheet = utils.aoa_to_sheet([headers, ...data]);
      utils.book_append_sheet(workbook, worksheet, 'Turnos-Profesionales');
      
      // Generar el archivo Excel
      const excelBuffer = writeFile(workbook, 'turnos-profesionales.xlsx', { bookType: 'xlsx', type: 'buffer' });
      
      // Descargar el archivo Excel
      if(excelBuffer != undefined)      
      this.saveExcelFile(excelBuffer, 'turnos-profesionales.xlsx');
    }   
  }

  async DescargarPDF() {
    const data: Usuario[][] = this.usuarios.map((usuario: { dni: string; nombre: string; apellido: string; mail: string; perfil: string; habilitado: boolean }) => {
      let habilitado = usuario.habilitado ? 'si' : 'no';
    
        return [usuario.dni, usuario.nombre, usuario.apellido, usuario.mail, usuario.perfil, habilitado];
    });
  
    const headers: string[] = ['Dni', 'Nombre', 'Apellido', 'Mail', 'Perfil', 'Habilitado'];

    const documentDefinition: any = {
      header: `Listado de usuarios ${moment().format('DD/MM/YYYY')}`,
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

  saveExcelFile(buffer: ArrayBuffer, fileName: string) {
    const data = new Blob([buffer], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(data);

    // Crear un enlace de descarga y hacer clic en él
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();

    // Liberar la URL del objeto
    window.URL.revokeObjectURL(url);
  }

  RegistrarUsuarioAdministrador(){
    this.formularioRegistrarUsuarioVisible = !this.formularioRegistrarUsuarioVisible;
  }
}
