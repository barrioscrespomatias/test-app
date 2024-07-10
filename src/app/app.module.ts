import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms'; // Importa FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home/home.component';
import { FirebaseAppModule, initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { AuthModule } from '@angular/fire/auth';
import { FirestoreModule } from '@angular/fire/firestore';
import { NavComponent } from './components/nav/nav/nav.component';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { FirebaseAuthService } from './services/angularFire/angular-fire.service';
import { HttpClientModule } from '@angular/common/http';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MaterialTablePaginatorComponent } from './components/material-table-paginator/material-table-paginator.component';

import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { StorageModule } from '@angular/fire/storage';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    PacientesComponent,
    MaterialTablePaginatorComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FirebaseAppModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatTableModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    FirestoreModule,
    StorageModule
  ],
  providers: [FirebaseAuthService,
             { provide: FIREBASE_OPTIONS, useValue: environment.firebase }, 
             AngularFirestore,
             provideFirebaseApp(() => initializeApp(environment.firebase))
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }