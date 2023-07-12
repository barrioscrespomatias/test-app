import { Component } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno';
import { Usuario } from 'src/app/interfaces/usuario';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { EspecialidadService } from 'src/app/servicios/entidades/especialidad/especialidad.service';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';
import { slideAnimation } from '../../animation';

//pdf
import * as moment from 'moment';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-tabla-historias-clinicas',
  templateUrl: './tabla-historias-clinicas.component.html',
  styleUrls: ['./tabla-historias-clinicas.component.css'],
  animations: [slideAnimation]
})
export class TablaHistoriasClinicasComponent {
  heroes = [
    { id: 11, name: 'Mr. Nice', country: 'India' },
    { id: 12, name: 'Narco' , country: 'USA'},
    { id: 13, name: 'Bombasto' , country: 'UK'},
    { id: 14, name: 'Celeritas' , country: 'Canada' },
    { id: 15, name: 'Magneta' , country: 'Russia'},
    { id: 16, name: 'RubberMan' , country: 'China'},
    { id: 17, name: 'Dynama' , country: 'Germany'},
    { id: 18, name: 'Dr IQ' , country: 'Hong Kong'},
    { id: 19, name: 'Magma' , country: 'South Africa'},
    { id: 20, name: 'Tornado' , country: 'Sri Lanka'}
  ];

   //#region Constructor
   constructor(
    private especialidadService: EspecialidadService,
    private usuarioService: UsuarioService,
    private turnoService: TurnoService,
    private firebaseService: FirebaseAuthService
  ) {}

  //#endregion

  estadoActual: string = 'estadoInicial';

  cambiarEstado() {
    this.estadoActual = 'estadoFinal';
  }

  //#region Propiedades
  
  usuario: any;
  usuarios: any;
  mail: string = this.firebaseService.userName;
  turnosSubscription:any;
  turnos: any;
  parametrosDinamicos: any;
  especialidades: any;
  formularioSeleccionado:string = '';
  turno:any;
  searchText: any;
  pacienteSeleccionado:string='';
  profesionalSeleccionado:string='';
  especialidadSeleccionada:string='';

  //#endregion

  //#region Hooks

  async ngOnInit() {
    this.usuarioService.getProfesional(this.mail).then((usuario: any) => {
      this.usuario = usuario;
    });

    this.usuarioService.TraerTodos().then((usuarios: any) => {
      this.usuarios = usuarios;
    });

    // this.turnoService.TraerTodos().then((turnos: any) => {
    //   this.turnos = turnos;
    // });

    this.turnosSubscription = (
      await this.turnoService.TraerTodos()
    ).subscribe((turnos) => {
      this.turnos = turnos
    });  

    this.especialidadService.TraerTodos().then((especialidades: any) => {
      this.especialidades = especialidades;
    });
  }

  ngOnDestroy() {
    if (this.turnosSubscription) {
      this.turnosSubscription.unsubscribe();
    }
  }

  //#endregion

  //#region Metodos
  ConvertirFecha(fecha:any){
    return new Date(fecha.seconds * 1000);
  }

  AbrirModal(formularioModal:string, turno:Turno) {
    this.formularioSeleccionado = formularioModal;
    this.turno = turno;
  }

  ObtenerPacienteSeleccionado(emailPaciente:string){
    this.pacienteSeleccionado = emailPaciente;    
  }

  ObtenerProfesionalSeleccionado(emailProfesional:string){
    this.profesionalSeleccionado = emailProfesional;    
  }

  ObtenerEspecialidadSeleccionada(especialidadSeleccionada:string){
    this.pacienteSeleccionado = '';
    this.profesionalSeleccionado = '';
    this.especialidadSeleccionada = especialidadSeleccionada;
  }

  //#endregion

   //#region  pdf

   async DescargarPDF() {
    // const data: Turno[][] = this.usuario.turnos.map((usuario: { dni: string; nombre: string; apellido: string; mail: string; perfil: string; habilitado: boolean }) => {
    //   let habilitado = usuario.habilitado ? 'si' : 'no';
    
    //     return [usuario.dni, usuario.nombre, usuario.apellido, usuario.mail, usuario.perfil, habilitado];
    // });


    //Paciente seleccionado

   
      const data: Turno[][] = 
      this.turnos
      .filter((turno: { profesional: string, estado:number; especialidad:string }) => turno.estado == 4 && this.especialidadSeleccionada == turno.especialidad )    
      .map((turno: { especialidad: string; estado: number; diagnostico: string; resena: string; profesional: string; paciente: string;}) => {

        let estadoTruno: string = '';
          switch (turno.estado) {
            case 4:
              estadoTruno = 'Realizado';
              break;            
          }

          return [turno.especialidad, estadoTruno, turno.diagnostico, turno.resena];
      });
   
    
  
    const headers: string[] = ['Especialidad', 'Estado turno', 'Diagnostico', 'Reseña'];

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
