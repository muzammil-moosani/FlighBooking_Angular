import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';
import { NotificationService } from '../_services/notification.service';

@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: any;
    submitted = false;
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = ''

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private tokenStorage: TokenStorageService,
        private notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        if (this.tokenStorage.getToken()) {
          this.isLoggedIn = true;
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit(): void {
      this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
      const { username, password } = this.loginForm.value;
     
      this.authService.login(username, password).subscribe(
        data => {
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(username);  
          this.notificationService.showSuccess("Logged In Successfully","Pass");      
          this.router.navigate(['/home']);   
          window.setTimeout(this.reloadPage,1000);
                   
        },
        error => {
          this.isLoginFailed = true;
          this.errorMessage = error.message;
          this.notificationService.showError(this.errorMessage,"Fail");
        }
      );
    }
    reloadPage(): void {
      window.location.reload();  
    }
}
