import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthanticateService } from 'src/app/service/authanticate.service';
import { ShredsericeService } from 'src/app/service/shredserice.service';
import { SignUpModelComponent } from 'src/app/sign-up-model/sign-up-model.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showpass: boolean = false;
  animal: string;
  name: string;

  constructor(
    public dialog: MatDialog,
    private auth: AuthanticateService,
    private fb: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private cookie: CookieService,
    private router: Router
  ) {}

  loginform = this.fb.group({
    email: [''],
    password: [''],
  });

  onsubmit() {
    this.ngxService.start();
    this.auth.loginuser(this.loginform.value).subscribe(
      (res: any) => {
        this.ngxService.stop();
        if (res.isauthuser) {
          console.log(res.token);
          this.cookie.set('token', res.token);

          sessionStorage.setItem('user', JSON.stringify(res));
          if (res.role == 'admin') {
            this.ngxService.start();
            this.router.navigateByUrl('/home');
            this.ngxService.stop();
          }
          if (res.role == 'user') {
            this.router.navigateByUrl('/index/home');
          }
          if (res.role == 'deliveryboy') {
            this.router.navigateByUrl('/index/orders');
          }
        }
      },
      (err) => {
        this.ngxService.stop();
        Swal.fire({
          title: err,
          html: '<h2 class="text-dark">Please login again</h2>',
          color: 'red',
          imageUrl: 'https://media.tenor.com/XKZzgtRWO0EAAAAi/khersi.gif',

          imageWidth: 250,
          imageHeight: 250,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SignUpModelComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.ngxService.start();
        const payload = {
          name: result[0].name,
          email: result[0].email,
          password: result[0].password,
          confirm_pass: result[0].confirm_pass,
          role: 'user',
          userprofile: result[1],
        };
        console.log(payload);
        this.auth.ragisteruser(payload).subscribe(
          (res: any) => {
            this.ngxService.stop();
            if (res.isusercreated) {
              Swal.fire({
                title: 'User registerd successfully',
                showConfirmButton: false,
                timer: 2500,
                imageUrl:
                  'https://i.gifer.com/origin/6d/6d6a82eb9764f9b625e593f9a5a2de85.gif',
                imageWidth: 400,
                imageHeight: 400,
              });
            }
          },
          (error) => {
            this.ngxService.stop();
            Swal.fire({
              title: error,
              html: '<h2 class="text-dark">Please register again</h2>',
              color: 'red',
              imageUrl: 'https://media.tenor.com/XKZzgtRWO0EAAAAi/khersi.gif',

              imageWidth: 250,
              imageHeight: 250,
              showConfirmButton: false,
              timer: 2500,
            });
          }
        );
      }
    });
  }

  onchange(event) {
    this.showpass = event.target.checked;
    console.log(this.showpass);
  }

  async forgotpass() {
    const { value: Email } = await Swal.fire({
      title: 'Input email address for Find account',
      input: 'email',
      inputLabel: 'Email address',
      inputPlaceholder: 'Enter email address',
    });

    if (Email) {
      this.auth.isuserexist(Email).subscribe((res: any) => {
        if (res.message === 'true') {
          const email = Email.split('@')[0];
          const domain = Email.split('@')[1];
          var showemail = '';
          for (var i = 0; i < 4; i++) {
            showemail += email[i];
          }
          for (var j = 0; j < Email.length - 4; j++) {
            showemail += '*';
          }

          console.log(showemail);
          Swal.fire({
            title:
              'Do you want to send password on ' + showemail + '@' + domain,

            showCancelButton: true,
            confirmButtonText:
              '<i class="fa-regular fa-paper-plane">&nbsp;</i> send',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */

            if (result.isConfirmed) {
              Swal.fire({
                imageUrl:
                  'https://thumbs.gfycat.com/MeaslyBlissfulBlacklab-max-1mb.gif',
                imageHeight: 290,
                text: 'password sent on ' + showemail + '@' + domain,
              });
              this.auth.forgotpass(Email).subscribe(
                (res: any) => {},
                (err) => {
                  console.log(err);
                }
              );
            }
          });
        } else if (res.message === 'false') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Account doesn't found",
          });
        }
      });
    }
  }
}
