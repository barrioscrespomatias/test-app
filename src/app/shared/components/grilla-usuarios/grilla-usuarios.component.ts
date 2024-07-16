import { Component, EventEmitter, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { UsuarioComponent } from '../usuario/usuario.component';
import { UsuarioV2Service } from 'src/app/servicios/v2/usuario-v2.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grilla-usuarios',
  standalone: true,
  imports: [UsuarioComponent, CommonModule],
  templateUrl: './grilla-usuarios.component.html',
  styleUrl: './grilla-usuarios.component.css',
  providers: [UsuarioV2Service],
  schemas: [NO_ERRORS_SCHEMA]
})
export class GrillaUsuariosComponent {
  constructor(private usuarioService: UsuarioV2Service){

  }
  
  @Output() messageEvent = new EventEmitter<string>();

  usuarios: Usuario[] = [];
  medium:string ='round-image-medium';
  small:string ='round-image-small';
  large:string ='round-image-large';

  sendMessage(mensaje:string) {
    this.messageEvent.emit(mensaje);
  }

  ngOnInit(): void {
    this.usuarioService.traerUsuarios().subscribe((t) => {
      this.usuarios = t as Usuario[];
    });
  }
}