import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private afa: AngularFireAuth
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
}
