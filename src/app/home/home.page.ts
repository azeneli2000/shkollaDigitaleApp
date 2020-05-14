import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import{AlertController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed, 
  Modals
  } from '@capacitor/core';
import { AuthenticationService } from '../services/authentication.service';

const { PushNotifications } = Plugins;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
 tokenNot : string;
nxenesi ;
emri;
mbiemri;
shkolla;
lendet ;
tremestri;
klasa;
indeksi;
vitiShkollor;
usersArray;
 constructor(public alertController : AlertController,private http : HttpClient,private menu :MenuController,public auth : AuthenticationService) {
   
 }
 compareFn(e1, e2): boolean {
  return e1 && e2 ? e1.id == e2.id : e1 == e2;
}
changeLogedInUser(u){
  localStorage.setItem('logedInUser',JSON.stringify(u.detail.value));
  this.nxenesi = JSON.parse(localStorage.getItem("logedInUser"));
  this.emri = this.nxenesi["emri"];
  this.getUserData(1,1);
}
 openFirst() {
  this.menu.enable(true, 'first');
  this.menu.open('first');
}

t1Click()
{
  this.http.get('http://80.78.75.57:84/api/Prindi?klasa='+ this.klasa+'&indeksi='+ this.indeksi+'&id_shkolla='+this.nxenesi.id_shkolla +'&viti_sh='+this.vitiShkollor + '&nr_amza='+this.nxenesi.amza+'&df=' + this.vitiShkollor.substring(0,4)+'/09/01&dm=' + this.vitiShkollor.substring(0,4)+'/12/31').subscribe((response)=>{
      this.lendet= response; this.tremestri = "Tremestri I";})
}
t2Click()
{
  this.http.get('http://80.78.75.57:84/api/Prindi?klasa='+ this.klasa+'&indeksi='+ this.indeksi+'&id_shkolla='+this.nxenesi.id_shkolla +'&viti_sh='+this.vitiShkollor + '&nr_amza='+this.nxenesi.amza+'&df=' + this.vitiShkollor.substring(5,9)+'/01/01&dm=' + this.vitiShkollor.substring(5,9)+'/03/31').subscribe((response)=>{
  this.lendet= response;this.tremestri = "Tremestri II";})
}
t3Click()
{
  this.http.get('http://80.78.75.57:84/api/Prindi?klasa='+ this.klasa+'&indeksi='+ this.indeksi+'&id_shkolla='+this.nxenesi.id_shkolla +'&viti_sh='+this.vitiShkollor + '&nr_amza='+this.nxenesi.amza+ '&df=' + this.vitiShkollor.substring(5,9)+'/04/01&dm=' + this.vitiShkollor.substring(5,9)+'/06/30').subscribe((response)=>{
      this.lendet= response;this.tremestri = "Tremestri III";})
}
perfundimtareClick()
{
  this.http.get('http://80.78.75.57:84/api/Prindi?klasa='+ this.klasa+'&indeksi='+ this.indeksi+'&id_shkolla='+this.nxenesi.id_shkolla +'&viti_sh='+this.vitiShkollor + '&nr_amza='+this.nxenesi.amza+'&df=' + this.vitiShkollor.substring(0,4)+'/12/31&dm=' + this.vitiShkollor.substring(0,4)+'/12/31').subscribe((response)=>{
  this.lendet= response;this.tremestri = "Perfundimtare";})  
}
shpjegimeClick()
{

}

gjejVitin(){
  if (new Date().getMonth() >= 7)  
    return new Date().getFullYear().toString() + "-" + (new Date().getFullYear() + 1).toString();
  
  else
    return (new Date().getFullYear() - 1).toString() + "-" + new Date().getFullYear().toString();
}

gjejTreMujorin(vitiShkollor : string) : number
{
  let  dataSot = new Date();
//   let t1F = (vitiShkollor.substring(0,4)+"/09/01");
//   let t1M = (vitiShkollor.substring(0,4)+"/12/31");
//   let t2F = (vitiShkollor.substring(5,9)+"/01/01");
//   let t2M = (vitiShkollor.substring(5,9)+"/03/31");
// let t3F = (vitiShkollor.substring(5,9)+"/04/01");
// let t3M  =(vitiShkollor.substring(5,9)+"/06/30");

  if(dataSot>=new Date(vitiShkollor.substring(0,4)+"/09/01")&&dataSot<=new Date(vitiShkollor.substring(0,4)+"/12/31"))
    return 1;
    
  if(dataSot>=new Date(vitiShkollor.substring(5,9)+"/01/01")&&dataSot<=new Date(vitiShkollor.substring(5,9)+"/04/01"))
    return 2;

    if(dataSot>=new Date(vitiShkollor.substring(5,9)+"/04/01")&&dataSot<=new Date(vitiShkollor.substring(5,9)+"/06/30"))
     return 3;
  return 4
}


getNotat(){
  this.vitiShkollor  = this.gjejVitin();
  let tremujori =   this.gjejTreMujorin(this.vitiShkollor);
  //  this.openFirst();
  console.log(tremujori);
  console.log(this.vitiShkollor);
switch (tremujori){
    case 1 :{     
      this.t1Click()
      break;
      
    } 
    case 2 :{
      this.t2Click();
      break;
    } 
    case 3 :{
      this.t3Click()
      break;
    } 
    case 4 :{
      this.perfundimtareClick();
      break;
    } 
}   
}

doRefresh(event) {
  switch (this.tremestri){
    case "Tremestri I" :{     
      this.t1Click();
      event.target.complete();
      break;
      
    } 
    case "Tremestri II" :{
      this.t2Click();
      event.target.complete();
      break;
    } 
    case "Tremestri III" :{
      this.t3Click();
      event.target.complete();
      break;
    } 
    case "Perfundimtare" :{
      this.perfundimtareClick();
      event.target.complete();
      break;
    } 
} 
  ;
}
getUserData(user,password){
      this.nxenesi = JSON.parse(localStorage.getItem("logedInUser"));
     this.emri = this.nxenesi["emri"];
    this.mbiemri = this.nxenesi["mbiemri"];
    this.shkolla = this.nxenesi["emri_shkolla"];
    this.klasa = this.nxenesi["klasa"];
    this.indeksi = this.nxenesi["indeksi"];
    this.getNotat();
  // });
}
  ngOnInit() {
   this.usersArray =  this.auth.checkTokens();
  this.getUserData('112','4');

//push notifications
    PushNotifications.register();
    PushNotifications.addListener('registration', 
      (token: PushNotificationToken) => {
       // alert('Push registration success, token: ' + token.value);
        this.tokenNot = token.value;
      }
    );

    PushNotifications.addListener('registrationError', 
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );
 // ketu do te merren te dhenat nga objekti data i notification per rastin kur nje user ka me shume se nje femije
 //per rastin kur nxenesi kalon klasen do te modifikohet dhe tabela e perdoruesit
 //do te fshihen ne menyre automatike userat qe kane kaluar klasen e 9 ne qershor ???/?
    PushNotifications.addListener('pushNotificationReceived', 
       (notification: PushNotification) => {
        alert('Push received: ' + JSON.stringify(notification));
      //   let n =  Modals.alert({
      //     title : "notification.title",
      //     message : notification.body 
      this.presentAlert(notification.body,notification.title);
      
        });
      
      
    

    PushNotifications.addListener('pushNotificationActionPerformed', 
      (notification: PushNotificationActionPerformed) => {
      //  alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
    
}
ionViewDidEnter (){
  this.emri = JSON.parse(localStorage.getItem("logedInUser")).emri;
  this.usersArray =  this.auth.checkTokens();
  
  this.getUserData(1,1);
}	

async presentAlert(body : string, title : string ) {
  const alert = await this.alertController.create({
    header: title,
    subHeader: "title",
    message: body,
    buttons: ['OK']
  });

  await alert.present();

}
}
