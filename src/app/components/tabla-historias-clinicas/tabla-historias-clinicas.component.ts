import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomNg2SearchPipe } from 'src/app/pipes/customNg2Search/custom-ng2-search.pipe';
import { FiltroTurnosHistoriaClinicaPipe } from 'src/app/pipes/filtroTurnosHistoriaClinica/filtro-turnos-historia-clinica.pipe';
import { NavComponent } from '../nav/nav/nav.component';

@Component({
  selector: 'app-tabla-historias-clinicas',
  templateUrl: './tabla-historias-clinicas.component.html',
  styleUrls: ['./tabla-historias-clinicas.component.css'],
  animations: [slideAnimation],
  standalone: true,
  imports: [CommonModule, 
            FormsModule, 
            ReactiveFormsModule, 
            CustomNg2SearchPipe, 
            FiltroTurnosHistoriaClinicaPipe,
            NavComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
  isLogged: boolean = false;

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

  usuariosPacientes: any;
  turnosProfesional: any;
  turnosProfesionalArray:any;
  showDivTurno:boolean = false;

  //#endregion

  //#region Hooks

  async ngOnInit() {
    await this.checkLoggedIn();

    this.usuarioService.getUsuario(this.mail).then(async (usuario: any) => {
      this.usuario = usuario;

      (await this.turnoService.TurnosRealizadosProfesional(this.usuario?.docRef)).subscribe(turnosDelProfesional => {
        this.turnosProfesional = this.agruparTurnosPorPaciente(turnosDelProfesional);
        this.turnosProfesionalArray = Array.from(this.turnosProfesional.values());
      });
    });

    this.usuarioService.TraerTodos().then((usuarios: any) => {
      this.usuarios = usuarios;
    });

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

  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
  }

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

  agruparTurnosPorPaciente(turnos: Turno[]): Map<string, Turno> {
    const turnosAgrupados = new Map<string, Turno>();

    for (const turno of turnos) {
      // Utilizar el correo del paciente como clave
      const clavePaciente = turno.paciente;

      // Si la clave aún no existe en el mapa, agregar el turno
      if(clavePaciente != undefined){
        if (!turnosAgrupados.has(clavePaciente)) {
          turnosAgrupados.set(clavePaciente, turno);
        }
      }
    }

    return turnosAgrupados;
  }

  //#endregion

   //#region  pdf

   async DescargarPDF() {
    // const data: Turno[][] = this.usuario.turnos.map((usuario: { dni: string; nombre: string; apellido: string; mail: string; perfil: string; habilitado: boolean }) => {
    //   let habilitado = usuario.habilitado ? 'si' : 'no';
    
    //     return [usuario.dni, usuario.nombre, usuario.apellido, usuario.mail, usuario.perfil, habilitado];
    // });

    var data: Turno[][];
    
    if(this.searchText != undefined && this.searchText.length > 0)
    {
      data = 
      this.turnos   
      .filter((turno: { profesional: string, estado:string; especialidad:string, paciente:string }) => turno.estado == 'Realizado' 
                                                                                      && turno.paciente == this.usuario.docRef
                                                                                      && (turno.especialidad.toLowerCase().includes(this.searchText.toLowerCase())                                                                                      
                                                                                      || turno.estado.toLowerCase().includes(this.searchText.toLowerCase())
                                                                                      || turno.profesional.toLowerCase().includes(this.searchText.toLowerCase())))    
      .map((turno: { especialidad: string; estado: number; diagnostico: string; resena: string; profesional: string; paciente: string;}) => {
          return [turno.profesional, turno.paciente, turno.especialidad, turno.estado, turno.diagnostico, turno.resena];
      });
    }
    else{
      data = 
      this.turnos
      .filter((turno: { profesional: string, estado:string; especialidad:string, paciente:string }) => turno.estado == 'Realizado' 
                                                                                      && turno.paciente == this.usuario.docRef)    
      .map((turno: { especialidad: string; estado: number; diagnostico: string; resena: string; profesional: string; paciente: string;}) => {
          return [turno.profesional, turno.paciente, turno.especialidad, turno.estado, turno.diagnostico, turno.resena];
      });
    }
     
    //Debe coincidir con el return del filter/map de los datos.
    const headers: string[] = ['Profesional', 'Paciente', 'Especialidad', 'Estado turno', 'Diagnostico', 'Reseña'];

    const documentDefinition: any = {
      header: {
        text: `Historia clinica. Fecha: ${moment().format('DD/MM/YYYY')}`,
        alignment: 'center',  // Centrar el texto
        margin: [0, 10, 0, 10],  // Ajustar los márgenes según sea necesario
      },
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
        { text: 'Atenciones' },        
        {
          table: {
            headerRows: 1,
            //Espacio que ocupa cada columna. Cantidad / 100 porcentaje optimo.
            widths: ['15%', '15%', '15%', '25%', '15%', '15%'],
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
          fontSize: 12,
          bold: true,
          margin: [0, 10, 0, 10], // Ajusta los valores de margen según tus necesidades
        },
        tableStyle: {
          fontSize: 6, // Ajusta el tamaño de letra de la tabla
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
