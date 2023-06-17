import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs';
import { User } from 'src/app/clases/user/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import SweetAlert from 'sweetalert2';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    //// Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
          up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        // this.swal.SwalMensajeError('Error',error.message);
        SweetAlert.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      });
  }
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      roles: {
        profesional: true,
      },
    };
    return userRef.set(data, {
      merge: true,
    });
  }
  SendVerificationMail() {
    return (
      this.afAuth.currentUser
        //TODO enviar email para verificar cuenta
        .then((u: any) => u.sendEmailVerification())
        .then(() => {
          // this.router.navigate(['']);
          alert('Email enviado')
        })
    );
  }

  signOut() {
    this.afAuth.signOut();
  }

  private updateUserData(user: User) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        profesional: true,
      },
    };
    return userRef.set(data, { merge: true });
  }
}
