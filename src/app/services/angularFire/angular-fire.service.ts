import { Injectable, NgZone } from '@angular/core';
// import { User } from '../../clases/user/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
// import { Swal } from '../../clases/swal/swal';
import SweetAlert from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['home']);
          }
        });
      })
      .catch((error) => {
        console.log(error);
        // this.swal.SwalMensajeError('Error',error.message);
        SweetAlert.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        // this.SetUserData(result.user);
      })
      .catch((error) => {

        if(error.message == 'Firebase: Error (auth/email-already-in-use).')
        // this.swal.SwalMensajeError('Error',error.message);
        SweetAlert.fire({
          icon: 'error',
          title: 'Error',
          text: 'El dirección de email ya se encuentra registrada.',
        });
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return (
      this.afAuth.currentUser
        //TODO enviar email para verificar cuenta
        .then((u: any) => u.sendEmailVerification())
        // .then(() => {
        //   this.router.navigate(['registro']);
        // })
    );
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        // this.swal.SwalMensajeGenerico('Atencion','Se ha enviado un email para resetear el password');
        SweetAlert.fire({
          icon: 'warning',
          title: 'Atencion!',
          text: 'Se ha enviado un email para resetear el password',
        });
      })
      .catch((error) => {
        // this.swal.SwalMensajeError('Error',error);
        SweetAlert.fire({
          icon: 'error',
          title: 'Error',
          text: error,
        });
      });
  }

async isLoggedIn(): Promise<boolean> {
  const logueado = await this.GetLogueado();
  return logueado == true;
}

  get userName(): string {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? user.email : '';
  }

  get userId(): string {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? user.uid : '';
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['home']);
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['home']);
        // this.SetUserData(result.user);
      })
      .catch((error) => {
        // this.swal.SwalMensajeError('Error',error);
        SweetAlert.fire({
          icon: 'error',
          title: 'Error',
          text: error,
        });
      });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      //TODO verificar cuenta con email
      emailVerified: user.emailVerified,
      // emailVerified: true,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }


  GetLogueado() { 
    return new Promise<boolean>((resolve, reject) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (user) {          
          // Usuario logueado
          resolve(true);
        } else {
          // Usuario no logueado
          resolve(false);
        }
      });
    });
  }

  GetEmailLogueado() { 
    return new Promise<string>((resolve, reject) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (user && user.email) {
          // Usuario logueado con correo electrónico
          resolve(user.email);
        } else {
          // Usuario no logueado o sin correo electrónico
          resolve("");
        }
      });
    });
  }

  GetUserLogueado() { 
    return new Promise<any>((resolve, reject) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (user) {
          // Usuario logueado con correo electrónico
          resolve(user);
        } else {
          // Usuario no logueado o sin correo electrónico
          resolve("");
        }
      });
    });
  }
}
