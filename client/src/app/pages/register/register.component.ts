import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/@services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: any;
  photo: string =
    'data:image/png;base64,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';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      photo: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const user = this.form.value;
      this.authService
        .Register(user.name, user.email, user.password, user.photo)
        .then((res) => {
          console.log(res);
        });
    } else {
      alert('Form invalid');
    }
  }

  imageSrc: string = '';
  imageString: string = '';
  handleInputChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e: any) {
    let reader = e.target;
    //base64image stream
    this.imageSrc = reader.result;
    this.compress(this.imageSrc, 200).then((newImg: any) => {
      this.imageString = newImg;

      this.photo = this.imageString;
      this.form.get('photo').setValue(this.photo);
    });
  }

  //compress image
  compress(src: any, width: number = 200) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const elem = document.createElement('canvas');
        const newX = width; //max width
        const newY = (img.height * newX) / img.width;
        elem.width = newX;
        elem.height = newY;
        const ctx = elem.getContext('2d');
        ctx?.drawImage(img, 0, 0, newX, newY);
        const data = ctx?.canvas.toDataURL();
        res(data);
      };
      img.onerror = (error) => rej(error);
    });
  }
}
