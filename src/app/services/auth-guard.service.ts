import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router'
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( private auth : AuthenticationService) { }
  canActivate() : boolean {
    console.log(this.auth.isAuthenticated());
   return this.auth.isAuthenticated();
  }
}
