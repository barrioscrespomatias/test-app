import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output } from '@angular/core';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { EspecialidadV2Service } from 'src/app/servicios/v2/especialidad-v2.service';
import { EspecialidadComponent } from "../../entidades/especialidad/especialidad.component";
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { NavComponent } from 'src/app/components/nav/nav/nav.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-grilla-especialidades',
  standalone: true,
  imports: [EspecialidadComponent, 
            CommonModule, 
            NavComponent,
            RouterLink,
          ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './grilla-especialidades.component.html',
  styleUrl: './grilla-especialidades.component.css'
})
export class GrillaEspecialidadesComponent {
  constructor(private especialidadService: EspecialidadV2Service,
    private translate: TranslateService,
    private router: Router
  ) {
  }

  @Output() messageEvent = new EventEmitter<string>();

  especialidades: Especialidad[] = [];
  medium: string = 'round-image-medium';
  small: string = 'round-image-small';
  large: string = 'round-image-large';

  isLogged: boolean = false;
  languageEnabled: boolean = false;

  sendMessage(profesion: string) {
    this.messageEvent.emit(profesion);
  }

  ngOnInit(): void {
    this.especialidadService.traerEspecialidades().subscribe((t) => {
      this.especialidades = t as Especialidad[];
    });
  }

  receiveMessage(idioma: string) {
    this.translate.setDefaultLang(idioma);
  }

  navigateToGrillaProfesionales(profesion: string) {
    this.router.navigate(['/grilla-profesionales'], { state: { profesion } });
  }
}
