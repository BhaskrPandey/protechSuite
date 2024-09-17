import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-manager-navbar',
  templateUrl: './manager-navbar.component.html',
  styleUrls: ['./manager-navbar.component.css']
})
export class ManagerNavbarComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) { }
  userName: string;

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('userName');
  }
  logout(){
    this.auth.logout();
    this.toastr.success('User logged Out Successfully!', "Success")
    this.router.navigate(["/login"]);
  }
}
