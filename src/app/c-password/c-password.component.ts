import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthanticateService } from '../service/authanticate.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-c-password',
  templateUrl: './c-password.component.html',
  styleUrls: ['./c-password.component.css'],
})
export class CPasswordComponent {
  constructor(
    private fb: FormBuilder,
    private authser: AuthanticateService,
    private ngx: NgxUiLoaderService,
    private router: Router
  ) {
    this.createform();
  }
  formsubmit: boolean = false;
  cform: FormGroup;

  createform() {
    this.cform = this.fb.group(
      {
        o_password: ['', Validators.required],
        n_password: ['', [Validators.minLength(6), Validators.required]],
        c_password: ['', Validators.required],
      },
      {
        validator: this.matchingPasswords('n_password', 'c_password'),
      }
    );
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return confirmPassword.setErrors({ passwordMismatch: true });
      }
    };
  }

  cpass() {
    this.formsubmit = true;
    if (this.cform.valid) {
      this.ngx.start();
      const userdetail = JSON.parse(sessionStorage.getItem('user'));
      const payload = {
        ...this.cform.value,
        email: userdetail.email,
      };
      console.log(payload);
      this.authser.changepassword(payload).subscribe(
        (res: any) => {
          this.ngx.stop();
          // this.cform.reset();
          // Object.keys(this.cform.controls).forEach((key) => {
          //   this.cform.get(key).setErrors(null);
          //   this.cform.get(key).markAsUntouched();
          // });

          Swal.fire({
            icon: 'success',
            title: 'password has been changed successfully',
            showConfirmButton: false,
            timer: 1800,
          });
          const user = JSON.parse(sessionStorage.getItem('user'));
          if (user.role === 'admin') {
            this.router.navigateByUrl('/home');
          }
        },
        (err) => {
          this.ngx.stop();
          Swal.fire({
            imageUrl:
              'https://thumbs.gfycat.com/SecondaryGentleFulmar-size_restricted.gif',
            imageHeight: 290,
            text: err,
          });
        }
      );
    }
  }

  forgotpass() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const email = user.email.split('@')[0];
    const domain = user.email.split('@')[1];
    var showemail = '';
    for (var i = 0; i < 4; i++) {
      showemail += email[i];
    }
    for (var j = 0; j < email.length - 4; j++) {
      showemail += '*';
    }

    console.log(showemail);
    Swal.fire({
      title: 'Do you want to send password on ' + showemail + '@' + domain,

      showCancelButton: true,
      confirmButtonText: '<i class="fa-regular fa-paper-plane">&nbsp;</i> send',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */

      if (result.isConfirmed) {
        Swal.fire({
          imageUrl:
            'https://thumbs.gfycat.com/MeaslyBlissfulBlacklab-max-1mb.gif',
          imageHeight: 290,
          text: 'password sent on ' + showemail + '@' + domain,
        });
        this.authser.forgotpass(user.email).subscribe(
          (res: any) => {},
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }
}
