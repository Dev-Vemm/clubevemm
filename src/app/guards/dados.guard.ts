import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class DadosGuard implements CanActivate {
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
          if(dt[0].CPF == null || dt[0].TELEFONE == null || dt[0].NASCIMENTO == '0000-00-00' || dt[0].SEXO == null){
            resolve(true);
          }else{
            this.router.navigate(['menu']);
          }
	  		}
	  	}else{
	  		this.router.navigate(['start']);
	  	}
    });
  }
}
