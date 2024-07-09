import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home/home.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { NavComponent } from './components/nav/nav/nav.component';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { FirebaseAuthService } from './services/angularFire/angular-fire.service';
import { HttpClientModule } from '@angular/common/http';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RefreshPageComponent } from './components/refresh-page/refresh-page.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MaterialTablePaginatorComponent } from './components/material-table-paginator/material-table-paginator.component';

import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage'; // Añadido para Storage


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    PacientesComponent,
    RefreshPageComponent,
    MaterialTablePaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatTableModule,
    AngularFirestoreModule,
    provideStorage(() => getStorage()), // Añadido para Storage
    FormsModule,
  ],
  providers: [FirebaseAuthService, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
