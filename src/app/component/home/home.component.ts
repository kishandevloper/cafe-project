import {
  AfterViewInit,
  Component,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BreakpointObserver } from '@angular/cdk/layout';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  isshow: boolean = true;
  user: any;

  @ViewChild(MatSidenav) sidenav: MatSidenav;
  ngAfterViewInit() {
    this.observer.observe(['(max-width : 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  ngOnInit() {
    $(document).ready(function () {
      $('#btn1').on('click', function () {
        $('#managecafe').slideToggle('slow');


      });
      $('#btn2').on('click', function () {
        $('#onlineorders').slideToggle('slow');


      });
      $('#btn3').on('click', function () {
        $('#oflineorders ').slideToggle('slow');
       
      });
      $('.menu-buttonx').on('click', function () {
        $('#onlineorders').slideUp('slow');
        $('#managecafe').slideUp('slow');
        $('#oflineorders ').slideUp('slow');
      });
    });
  }

  navclose() {
    this.observer.observe(['(max-width : 1010px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.close();
      }
    });
  }


  constructor(
    private cookieservice: CookieService,
    private router: Router,
    private observer: BreakpointObserver
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  logout() {
    this.cookieservice.delete('token');
    this.router.navigateByUrl('/login');
  }


}
