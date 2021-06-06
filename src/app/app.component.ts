import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged((u) => {
      console.log(u ? u.uid : 1);
    });
  }
  ngOnInit() {
    this.login('test@gmail.com', '123456');
  }
  login(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((value: any) => {
        console.log('Nice, it worked!');
      })
      .catch((err: any) => {
        console.log('Something went wrong: ', err.message);
      });
  }
}
