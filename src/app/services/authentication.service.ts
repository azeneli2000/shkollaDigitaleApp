import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { Platform } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import {Storage} from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

//const Tokens =[] : string
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
authenticationState = new BehaviorSubject(false);
//logedInUser = new BehaviorSubject(JSON.parse(localStorage.getItem("logedInUser")));
user;
arrayUsers:  string[] ;
  constructor(private storage : Storage, private plt : Platform,private http : HttpClient) {
    // this.plt.ready().then(()=>this.checkTokens())
   }
// getLogedInUser(){
//   this.logedInUser.next(JSON.parse(localStorage.getItem("logedInUser")))
// }
login(username,password){

  //sql table 
  // this.http.get('http://80.78.75.57:84/api/User/?user=' +username +'&pass='+ password).subscribe((response)=>{
  this.http.get('https://shkolladigitale-31d8a.firebaseio.com/users/'+ username + '.json').subscribe((response)=>{
    if (response)
    {
      if (response["pass"]==password)
      {
      console.log(response)
      let arr : string[] = [];
      this.arrayUsers = arr;
      if (JSON.parse(localStorage.getItem("users")))
      this.arrayUsers = JSON.parse(localStorage.getItem("users"));
      // debugger;
      this.arrayUsers.push(JSON.parse(JSON.stringify(response)));
      localStorage.setItem('users',JSON.stringify( this.arrayUsers));
      localStorage.setItem('logedInUser',JSON.stringify(response));
      this.authenticationState.next(true);
      }
      else 
      {
        console.log("pass i gabuar !");
      }

    }
  });



  
   
}

logout(user :string){
  return localStorage.remove(user).then(()=>{
    this.authenticationState.next(false);
  } );
}

isAuthenticated(){
return this.authenticationState.value;
}

checkTokens(){
 
this.arrayUsers =JSON.parse(localStorage.getItem("users"));

if (this.arrayUsers&&this.arrayUsers.length>0)
{
this.authenticationState.next(true);
return this.arrayUsers;
}
else
{
this.authenticationState.next(false);
return null;
}
}
}
