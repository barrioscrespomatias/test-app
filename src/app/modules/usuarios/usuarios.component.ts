import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Subscription, map } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent {
  constructor(private usuarioService: UsuarioService) {}

  suscripcionUsuariosService!: Subscription;
  usuarios: any;

  async ngOnInit() {
    this.usuarios = (await this.usuarioService.TraerTodos()).pipe(
      map((response: any[]) =>
        response.map((usuarioDb) => {
          const especialidadClass: any = {
            docRefUsuarioId: usuarioDb.docRefUsuarioId,
            dni: usuarioDb.dni,
            nombre: usuarioDb.nombre,
            apellido: usuarioDb.apellido,
            perfil: usuarioDb.perfil,
            habilitado: usuarioDb.habilitado,
            mail: usuarioDb.mail,
          };
          return especialidadClass;
        })
      )
    );

    // END NG ON INIT
  }

  CambiarEstado(usuario: Usuario) {
    if (usuario.habilitado)
      usuario.habilitado = false;
    else
      usuario.habilitado = true;

    if (usuario.docRefUsuarioId != null)
      this.usuarioService.Modificar(usuario.docRefUsuarioId, usuario);
  }
}
