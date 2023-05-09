import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit{
  userdata : any;
  ngOnInit(): void {
  const user = sessionStorage.getItem('user');
   this.userdata = JSON.parse(user);
  }


}
