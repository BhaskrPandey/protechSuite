import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 
  signupForm: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService // Inject ToastrService
  ) {
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  onSubmit() {
    // Handle form submission
    console.log(this.signupForm.value);
    if (this.signupForm.valid) {
      this.spinner.show();
      this.authService.register(this.signupForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.spinner.hide();
          this.toastr.success('User Added Successfully!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
          this.spinner.hide();
          if (err.error === 'User already registered') {
            this.toastr.error('User already registered');
          } else {
            this.toastr.error('Signup failed');
          }
        }
      });
    } else {
      this.toastr.error('Please fill all the fields');
    }
  }
}
