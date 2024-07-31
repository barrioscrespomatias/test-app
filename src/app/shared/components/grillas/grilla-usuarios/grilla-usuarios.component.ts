import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, OnInit, Output } from '@angular/core';
import { UsuarioComponent } from '../../entidades/usuario/usuario.component';
import { UsuarioV2Service } from 'src/app/servicios/v2/usuario-v2.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { CommonModule } from '@angular/common';
import { TablaHistoriasClinicasComponent } from 'src/app/components/tabla-historias-clinicas/tabla-historias-clinicas.component';
import { NavComponent } from 'src/app/components/nav/nav/nav.component';

@Component({
  selector: 'app-grilla-usuarios',
  standalone: true,
  imports: [UsuarioComponent, 
            CommonModule,
            TablaHistoriasClinicasComponent,
          NavComponent],
  templateUrl: './grilla-usuarios.component.html',
  styleUrl: './grilla-usuarios.component.css',
  providers: [UsuarioV2Service],
  schemas: [NO_ERRORS_SCHEMA]
})
export class GrillaUsuariosComponent implements OnInit {
  constructor(private usuarioService: UsuarioV2Service){

  }
  
  ngOnInit(): void {
    if(this.medidaImagen !== undefined && this.medidaImagen.length > 0)
      this.medium = this.medidaImagen;

    this.usuarioService.traerUsuarioPorPerfil('paciente').subscribe((t) => {
      this.usuarios = t as Usuario[];
    });
  }

  @Output() messageEvent = new EventEmitter<string>();
  @Input() medidaImagen!:string;

  usuarios: Usuario[] = [];
  medium:string = 'round-image-medium';
  small:string ='round-image-small';
  large:string ='round-image-large';

  sendMessage(mensaje:string) {
    this.messageEvent.emit(mensaje);
  }

}