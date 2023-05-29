import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpModelComponent } from '../sign-up-model/sign-up-model.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthanticateService } from '../service/authanticate.service';
import Swal from 'sweetalert2';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css'],
})
export class ManageEmployeeComponent {
  employee: Array<any> = [];
  constructor(
    public dialog: MatDialog,
    private ngxService: NgxUiLoaderService,
    private auth: AuthanticateService,
    private empservice: EmployeeService
  ) {}

  ngOnInit() {
    this.fetchemployee();
  }

  fetchemployee() {
    this.empservice.fetchemployee().subscribe(
      (res: any) => {
        this.employee = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(SignUpModelComponent, {
      data: { isaddemp: true },
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
          role: 'deliveryboy',
          userprofile: result[1],
          isfree: true,
          workingon: '',
        };
        console.log(payload);
        this.auth.ragisteruser(payload).subscribe(
          (res: any) => {
            this.ngxService.stop();
            if (res.isusercreated) {
              this.employee.push(payload);
              Swal.fire({
                title: 'Add dleveryman successfully',
                showConfirmButton: false,
                timer: 2500,
                imageUrl:
                  'https://i.giphy.com/media/cmCHuk53AiTmOwBXlw/giphy.webp',
                imageWidth: 400,
                imageHeight: 400,
              });
            }
          },
          (error) => {
            this.ngxService.stop();
            Swal.fire({
              title: error,
              html: '<h2 class="text-dark">Please Add again</h2>',
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
}
