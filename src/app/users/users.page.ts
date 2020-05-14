import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  constructor(private auth : AuthenticationService,private alertCtrl: AlertController) { }
arrayUsers : string[] = [] ;
getUsers(){
   this.arrayUsers =  JSON.parse(localStorage.getItem("users"));
   console.log(this.arrayUsers);

}
// te ky user do te shtohet dhe nje token ne db (max nje user do kete 2 token)
async addUser(){
  let alert = this.alertCtrl.create({
    header: 'Login',
    inputs: [
      {
        name: 'username',
        placeholder: 'Username'
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'Anullo',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Regjistro',
        handler: data => {
           this.auth.login(data.username,data.password)
        
        }
      }
    ]
  });
   (await alert).present();}
//do te fshihet nga db i shkolles
deleteUser(user){
  let x = JSON.parse(localStorage.getItem("logedInUser"));
  // debugger;

  for(let i = 0; i < this.arrayUsers.length; i++) {
    if( this.arrayUsers[i] == user){
      this.arrayUsers.splice(i, 1);
      localStorage.setItem('users',JSON.stringify( this.arrayUsers));
    }

  }
  if (JSON.stringify(user)==JSON.stringify(x))
  {
    if (this.arrayUsers.length>0){
      localStorage.setItem("logedInUser",JSON.stringify(this.arrayUsers[0]));
      //this.auth.getLogedInUser();
    }
    else
    localStorage.removeItem("logedInUser");
  }
}
  ngOnInit() {
    this.getUsers();
  }

}
