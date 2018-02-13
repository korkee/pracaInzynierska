import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class RoomService {

  options;
  domain = this.authService.domain;

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

  createAuthenticationHeaders() {
    this.authService.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authService.authToken
      })
    });
  }

  // Function to create a new room post
  newRoom(room) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'rooms/newRoom', room, this.options).map(res => res.json());
  }

  // Function to get all rooms from the database
  getAllRooms() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'rooms/allRooms', this.options).map(res => res.json());
  }

  // Function to get the room using the id
  getSingleRoom(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'rooms/singleRoom/' + id, this.options).map(res => res.json());
  }

  // Function to edit/update room post
  editRoom(room) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + 'rooms/updateRoom/', room, this.options).map(res => res.json());
  }

  // Function to delete a room
  deleteRoom(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.delete(this.domain + 'rooms/deleteRoom/' + id, this.options).map(res => res.json());
  }

  // Function to like a room post
  likeRoom(id) {
    const roomData = { id: id };
    return this.http.put(this.domain + 'rooms/likeRoom/', roomData, this.options).map(res => res.json());
  }

  // Function to dislike a room post
  dislikeRoom(id) {
    const roomData = { id: id };
    return this.http.put(this.domain + 'rooms/dislikeRoom/', roomData, this.options).map(res => res.json());
  }

  // Function to dislike a room post
  reserve(id) {
    const roomData = { id: id };
    return this.http.put(this.domain + 'rooms/reserve/', roomData, this.options).map(res => res.json());
  }
}
