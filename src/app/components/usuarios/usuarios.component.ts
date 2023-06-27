import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';
import { FileService } from 'src/app/servicios/file/file.service';
import { utils, writeFile } from 'xlsx';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  constructor(private usuarioService: UsuarioService, private file : FileService) {}

  series = [];
  suscripcionUsuariosService!: Subscription;
  usuarios: any;
  usuariosSubscription:any;
  formularioRegistrarUsuarioVisible:boolean = false;

  async ngOnInit() {

    this.usuariosSubscription = (
      await this.usuarioService.TraerTodos()
    ).subscribe((usuarios) => {
      this.usuarios = usuarios
    });    
  }

  ngOnDestroy() {
    if (this.usuariosSubscription) {
      this.usuariosSubscription.unsubscribe();
    }
  }

  CambiarEstado(usuario: Usuario) {
    debugger
    if (usuario.habilitado)
      usuario.habilitado = false;
    else
      usuario.habilitado = true;

    if (usuario.docRef != null)
      this.usuarioService.Modificar(usuario.docRef, usuario);
  }

  PreparaParaDescargar(lista:any, name:string, nameData:string){
    console.log(lista)
    return lista.pipe.map((dato: { name: any; data: any[]; })=>{
       return {[name]:dato.name,[nameData]:dato.data[0]}
     })
   }

  DescargarExcel() {
    if(this.usuarios.length > 0){
      const data: Usuario[][] = this.usuarios.map((usuario: { dni: string; nombre: string; apellido: string; mail: string; perfil: string; habilitado: boolean }) => {
        let habilitado = usuario.habilitado ? 'si' : 'no';
    
        // let perfil: string;
        // switch (usuario.perfil) {
        //   case 1:
        //     perfil = 'Lunes';
        //     break;
        //   case 2:
        //     perfil = 'Martes';
        //     break;
        //   default:
        //     perfil = 'Otro día';
        //     break;
        // }
    
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

  DescargarPDF() {
    const data: Usuario[][] = this.usuarios.map((usuario: { dni: string; nombre: string; apellido: string; mail: string; perfil: string; habilitado: boolean }) => {
      let habilitado = usuario.habilitado ? 'si' : 'no';
    
        return [usuario.dni, usuario.nombre, usuario.apellido, usuario.mail, usuario.perfil, habilitado];
    });
  
    const headers: string[] = ['Dni', 'Nombre', 'Apellido', 'Mail', 'Perfil', 'Habilitado'];
  
    const documentDefinition: any = {
      content: [
        { text: 'Usuarios', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              headers,
              ...data,
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 10, 0, 10], // Ajusta los valores de margen según tus necesidades
        },
      },
    };
  
    // Generar el documento PDF
    const pdfBuffer = pdfMake.createPdf(documentDefinition).getBuffer((buffer: any) => {
      // Descargar el archivo PDF
      this.savePDFFile(buffer, 'usuarios.pdf');
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
