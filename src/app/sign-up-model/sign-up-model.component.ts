import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from '../component/login/login.component';

@Component({
  selector: 'app-sign-up-model',
  templateUrl: './sign-up-model.component.html',
  styleUrls: ['./sign-up-model.component.css'],
})
export class SignUpModelComponent {
  imagesrc: string = '';
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {}

  signupform = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_pass: ['', [Validators.required]],
    },
    {
      validator: this.matchingPasswords('password' , 'confirm_pass'),
    }
  );
  // passwordmatchvalidator(fg: FormGroup): Validators {
  //   return fg.get('password').value === fg.get('confirm_pass').value
  //     ? null
  //     : { notmatch: true };
  // }
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return confirmPassword.setErrors({ passwordMismatch: true });
      }
    };
  }

  onNoClick(): void {
    console.log(this.signupform);
    this.dialogRef.close();
  }

  submitimage() {
    console.log(this.signupform.value);
  }

  changeimage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.imagesrc = reader.result as string;
    };
  }

  get name() {
    return this.signupform.controls['name'] as FormControl;
  }
}
export interface DialogData {
  animal: string;
  name: string;
  isaddemp : boolean
}
