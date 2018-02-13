import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  username: String;
  password: String;


  constructor(public authService:AuthService,
              private router:Router,
              private flashMessages:FlashMessagesService) { }


ngOnInit()
{

}

onLogoutClick()
{
  this.authService.logout();
  this.flashMessages.show('you are logged out', {cssClass: 'alert-success', timeout: 3000});
  this.router.navigate(['/']);
  return false;
}


}
