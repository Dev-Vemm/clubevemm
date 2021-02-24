import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import * as firebase  from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private loading: any;
  constructor(
    private afa: AngularFireAuth,
    //private fb: Facebook
  ) {  }

  async login(email, senha){
	  return new Promise((resolve, reject) =>{
      this.afa.signInWithEmailAndPassword(email, senha).then(
    		(res) => resolve(res),
    		(err) => reject(err)
    	);
    });
  }

  async logout(){
  	this.afa.signOut();
  }

  async register(email, senha){
  	return new Promise((resolve, reject)=>{
  		this.afa.createUserWithEmailAndPassword(email, senha).then(
  			(res) => resolve(res),
  			(err) => reject(err)
  		);
  	});
  }

  /*async facebook(){
    return new Promise((resolve, reject)=>{
      this.fb.login(['email']).then((response: FacebookLoginResponse) =>{
        const credential = firebase.default.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
        this.afa.signInWithCredential(credential).then(async (res) =>{
          console.log(res);
          const vals = {
            uid: res.user.uid,
            nome: res.user.displayName,
            telefone: res.user.phoneNumber,
            email: res.user.email
          };
          resolve(vals);
        }).catch((err) =>{
          reject(err);
        })
      }).catch((error) =>{
        reject(error);
      });
    });
  }*/
}
