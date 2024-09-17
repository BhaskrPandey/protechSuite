import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  loginForm: FormGroup;
  
  hide=true;
 
  constructor(private fb: FormBuilder,private spinner: NgxSpinnerService, private authService : AuthService, private router: Router, private toastr: ToastrService) {
  // constructor(private fb: FormBuilder,private spinner: NgxSpinnerService, private authService : AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]]
    });
  }
 
 
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.spinner.show();
      
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          sessionStorage.setItem('token', res.token);
          sessionStorage.setItem('role', res.role);
          sessionStorage.setItem('userName', res.userName);
          sessionStorage.setItem("id", res.id);

          if (res.role === 'user') {
            this.router.navigate(['/empHome']);
            this.spinner.hide();
            this.toastr.success('User logged in successfully as Employee!', 'Success');
          } else {
            this.router.navigate(['/home']);
            this.spinner.hide();
            this.toastr.success('User logged in successfully as Manager!', 'Success');
          }
          
        },
        error: (err) => {
          this.handleError(err);
        }
      });
    }
  }

  private handleError(error: any): void {
    if (error.status === 401) {
      this.toastr.error('Invalid email or password', 'Authentication Error');
    } else if (error.status === 404) {
      this.toastr.error('User does not exist', 'Error');
    } else {
      this.toastr.error('Invalid email or password', 'Error');
    }
  }
}
 

