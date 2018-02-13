import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {

  messageClass;
  message;
  newPost = false;
  loadingRooms = false;
  form;
  processing = false;
  username;
  roomPosts;
  rez=false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private roomService: RoomService
  ) {
    this.createNewRoomForm(); // Create new room form on start up
  }

  // Function to create new room form
  createNewRoomForm() {
    this.form = this.formBuilder.group({
      // Title field
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        this.alphaNumericValidation
      ])],
      // Body field
      body: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])],   // Body field
      startAt: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(5)
      ])],   // Body field
      endsAt: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(5)
      ])],
      city: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(2)
      ])],
      imgLink: ['', Validators.compose([
        Validators.maxLength(100),
        Validators.minLength(10)
      ])],
    })

  }

  // Enable new room form
  enableFormNewRoomForm() {
    this.form.get('title').enable(); // Enable title field
    this.form.get('body').enable(); // Enable body field
    this.form.get('startAt').enable(); // Enable body field
    this.form.get('endsAt').enable(); // Enable body field
    this.form.get('city').enable(); // Enable body field
    this.form.get('imgLink').enable(); // Enable body field
  }

  // Disable new room form
  disableFormNewRoomForm() {
    this.form.get('title').disable(); // Disable title field
    this.form.get('body').disable(); // Disable body field
    this.form.get('startAt').disable(); // Enable body field
    this.form.get('endsAt').disable(); // Enable body field
    this.form.get('city').disable(); // Enable body field
    this.form.get('imgLink').disable(); // Enable body field1
  }

  // Validation for title
  alphaNumericValidation(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/); // Regular expression to perform test
    // Check if test returns false or true
    if (regExp.test(controls.value)) {
      return null; // Return valid
    } else {
      return { 'alphaNumericValidation': true } // Return error in validation
    }
  }

  // Function to display new room form
  newRoomForm() {
    this.newPost = true; // Show new room form
  }

  // Reload rooms on current page
  reloadRooms() {
    this.loadingRooms = true; // Used to lock button
    this.getAllRooms(); // Add any new rooms to the page
    setTimeout(() => {
      this.loadingRooms = false; // Release button lock after four seconds
    }, 4000);
  }

  // Function to post a new comment on room post
  draftComment() {

  }

  // Function to submit a new room post
  onRoomSubmit() {
    this.processing = true; // Disable submit button
    this.disableFormNewRoomForm(); // Lock form
    // Create room object from form fields
    const room = {
      title: this.form.get('title').value, // Title field
      body: this.form.get('body').value, // Body field
      startAt: this.form.get('startAt').value, // startAt field
      endsAt: this.form.get('endsAt').value, // endsAt field
      city: this.form.get('city').value, // city field
      createdBy: this.username, // CreatedBy field
      reserve: false,
      imgLink: this.form.get('imgLink').value,

    }

    // Function to save room into database
    this.roomService.newRoom(room).subscribe(data => {
      // Check if room was saved to database or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error class
        this.message = data.message; // Return error message
        this.processing = false; // Enable submit button
        this.enableFormNewRoomForm(); // Enable form
      } else {
        this.messageClass = 'alert alert-success'; // Return success class
        this.message = data.message; // Return success message
        this.getAllRooms();
        // Clear form data after two seconds
        setTimeout(() => {
          this.newPost = false; // Hide form
          this.processing = false; // Enable submit button
          this.message = false; // Erase error/success message
          this.form.reset(); // Reset all form fields
          this.enableFormNewRoomForm(); // Enable the form fields
        }, 1000);
      }
    });
  }

  // Function to go back to previous page
  goBack() {
    window.location.reload(); // Clear all variable states
  }

  // Function to get all rooms from the database
  getAllRooms() {
    // Function to GET all rooms from database
    this.roomService.getAllRooms().subscribe(data => {
      this.roomPosts = data.rooms; // Assign array to use in HTML
    });
  }

  // Function to like a room post
  likeRoom(id) {
    // Service to like a room post
    this.roomService.likeRoom(id).subscribe(data => {
      this.getAllRooms(); // Refresh rooms after like
    });
  }

// Function to disliked a room post
  dislikeRoom(id) {
    // Service to dislike a room post
    this.roomService.dislikeRoom(id).subscribe(data => {
      this.getAllRooms(); // Refresh rooms after dislike
    });
  }
  reserve(id) {
    this.rez = true;
    // Service to dislike a room post
    this.roomService.reserve(id).subscribe(data => {
      this.getAllRooms(); // Refresh rooms after dislike
    });
  }
  ngOnInit() {
    // Get profile username on page load
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Used when creating new room posts and comments
    });

    this.getAllRooms(); // Get all rooms on component load
  }


}
