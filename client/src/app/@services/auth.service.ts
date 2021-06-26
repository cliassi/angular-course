import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    private storage: StorageService
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.storage.set('user', this.userData);
      } else {
        this.storage.set('user', null);
      }
    });
  }

  SignUp(name: string, email: string, password: string, photo: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(
      (result: any) => {
        // result.user.displayName = name;
        // this.SetUserDate(result.user);

        const user = { ...result.user };
        user.displayName = name;
        user.photoURL = photo;
        this.SetUserDate(user);
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(
      (result) => {
        this.SetUserDate(result.user);
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.storage.clear();
      this.router.navigate(['']);
    });
  }

  SetUserDate(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  get isLoggedIn(): boolean {
    const user = this.storage.get('user');
    return user !== null && user.uid ? true : false;
  }
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}
