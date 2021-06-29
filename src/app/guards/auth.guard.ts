import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
  	private router: Router,
  	private data: DataService
  ){}

  async canActivate(): Promise<boolean>{
  	let dt = await this.data.getStorage('USER');
    return new Promise((resolve) =>{
  		if(dt){
  			if(dt[0].PLANO_ID == null){
	  			this.router.navigate(['planos']);
	  		}else{
	  			resolve(true);
	  		}
	  	}else{
	  		this.router.navigate(['start']);
	  	}
  	});
  }


  
}
