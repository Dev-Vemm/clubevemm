import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
  	private afa: AngularFireAuth,
  	private router: Router
  ){}

  canActivate(): Promise<boolean>{
  	return new Promise(resolve =>{
  		this.afa.onAuthStateChanged(state =>{
  			if(state){
  				this.router.navigate(['menu']);
			}
			resolve(!state? true : false);
  		});
  	});
  }
  
}
