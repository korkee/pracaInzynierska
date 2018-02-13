import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AuthGuard} from '../../guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  messageClass;
  message;
  processing = false;
  form;
  previousUrl;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private authGuard: AuthGuard) {
    this.createForm(); // Create Login Form when component is constructed
  }

  // Function to create login form
  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required], // Username field
      password: ['', Validators.required] // Password field
    });
  }

  // Function to disable form
  disableForm() {
    this.form.controls['username'].disable(); // Disable username field
    this.form.controls['password'].disable(); // Disable password field
  }

  // Function to enable form
  enableForm() {
    this.form.controls['username'].enable(); // Enable username field
    this.form.controls['password'].enable(); // Enable password field
  }

  // Functiont to submit form and login user
  onLoginSubmit() {
    this.processing = true; // Used to submit button while is being processed
    this.disableForm(); // Disable form while being process
    // Create user object from user's input
    const user = {
      username: this.form.get('username').value, // Username input field
      password: this.form.get('password').value // Password input field
    }

    // Function to send login data to API
    this.authService.login(user).subscribe(data => {
      // Check if response was a success or error
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
        this.processing = false; // Enable submit button
        this.enableForm(); // Enable form for editting
      } else {
        this.messageClass = 'alert alert-success'; // Set bootstrap success class
        this.message = data.message; // Set success message
        // Function to store user's token in client local storage
        this.authService.storeUserData(data.token, data.user);
        // After 2 seconds, redirect to dashboard page
        setTimeout(() => {
          // Check if user was redirected or logging in for first time
          if (this.previousUrl) {
            this.router.navigate([this.previousUrl]); // Redirect to page they were trying to view before
          } else {
            this.router.navigate(['/dashboard']); // Navigate to dashboard view
          }
        }, 1000);
      }
    });
  }

  ngOnInit() {
    if (this.authGuard.redirectUrl) {
      this.messageClass = 'alert alert-danger';
      this.message = 'You must be logged in to view that page.';
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
  }
}




// import{ Component, OnInit } from '@angular/core';
// import {AuthService} from "../../services/auth.service";
// import {Router} from "@angular/router";
// import {FlashMessagesService} from "angular2-flash-messages";
//
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {
//
//   username: String;
//   password: String;
//
//   constructor(private authService:AuthService,
//               private router:Router,
//              private flashMessages:FlashMessagesService) { }
//
//   ngOnInit() {
//   }
//
//   onLoginSubmit(){
//     const user= {
//     username: this.username,
//     password: this.password
//                 }
//   this.authService.authenticateUser(user).subscribe(data =>{
//     if (data.success){
//       this.authService.storeUserData(data.token, data.user);
//       this.flashMessages.show('You are now logged in ',{cssClass: 'alert-success',timeout: 5000});
//       this.router.navigate(['dashboard']);
//
//     }else {
//       this.flashMessages.show(data.msg,{cssClass: 'alert-danger',timeout: 5000});
//       this.router.navigate(['login']);
//     }
//   });
//   }
// }
