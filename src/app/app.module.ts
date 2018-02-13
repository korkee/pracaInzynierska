import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";


import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ProfileComponent} from './components/profile/profile.component';

import {ValidateService} from './services/validate.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./guards/auth.guard";
import {RoomService} from "./services/room.service";
import {RoomComponent} from './components/room/room.component';
import { EditRoomComponent } from './components/edit-room/edit-room.component';
import {DeleteRoomComponent} from "./components/delete-room/delete-room.component";
import { NotAuthGuard } from './guards/notAuth.guard';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { FilterPipe } from './filter.pipe';
import { FilterDatePipe } from './filter-date.pipe';
import { FilterDate2Pipe } from './filter-date2.pipe';
import { FilterBodyPipe } from './filter-body.pipe';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'room', component: RoomComponent, canActivate: [AuthGuard]},
  {path: 'edit-room/:id', component: EditRoomComponent, canActivate: [AuthGuard]},
  {path: 'delete-room/:id', component : DeleteRoomComponent, canActivate: [AuthGuard]},
  {path: 'user/:username',component: PublicProfileComponent,canActivate: [AuthGuard]},
  {path: '**', component: HomeComponent},
]



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    RoomComponent,
    EditRoomComponent,
    DeleteRoomComponent,
    PublicProfileComponent,
    FilterPipe,
    FilterDatePipe,
    FilterDate2Pipe,
    FilterDate2Pipe,
    FilterBodyPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    ReactiveFormsModule
  ],
  providers: [ValidateService, AuthService, AuthGuard,NotAuthGuard, RoomService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {
}
