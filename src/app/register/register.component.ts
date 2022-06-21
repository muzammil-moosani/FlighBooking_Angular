import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: any;
    loading = false;
    submitted = false;
    isSuccessful = false;
    isSignUpFailed = false;
    errorMessage = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
    
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email] ],
      phonenumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    this.loading = true;
    const { username, email,phonenumber, password } = this.registerForm.value;
    this.authService.register(username, email, phonenumber,password).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.notificationService.showSuccess("Registered Successfully","Pass");      
          this.router.navigate(['/login']);  
      },
      error => {
        this.isSignUpFailed = true;
        this.errorMessage = error.message;
        this.notificationService.showError(this.errorMessage,"Fail");
      }
    );
  }

}
