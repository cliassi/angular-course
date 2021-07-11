import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@services/auth.service';
import { StorageService } from 'src/app/@services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    // this.authService.SignOut().then((res) => {
    //   console.log(res);
    // });
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const user = this.form.value;
      this.authService.Login(user.email, user.password).then((res) => {
        this.storageService.set('auth', res);
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 100);
      });
    } else {
      alert('Form invalid');
    }
  }
}
