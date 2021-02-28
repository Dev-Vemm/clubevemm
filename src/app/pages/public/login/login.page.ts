import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  senha: string;
  cadastrando: boolean = false;
  constructor(
    private firebase: FirebaseService, 
    private data: DataService, 
    private router: Router
    ) { }

  ngOnInit() {
  }

  login(email, senha){
    this.cadastrando = true;
    try{
      this.firebase.login(email, senha).then((fireLogin) =>{
        if(fireLogin['user']){
          let vals = {
            uid: fireLogin['user'].uid
          };
          this.data.requestPost(vals, 'logar').then((APIres) =>{
            console.log(APIres);
            if(APIres['status']){
              this.data.setStorage('USER', APIres['dados']);
              this.cadastrando = false;
              this.router.navigate(['menu']);
            }
          });
        }
      });
    }catch(err){
      if(err['code']){
        if(err['code'] == 'auth/user-not-found'){
          console.log('Usuário não encontrado.');
        }
      }
      console.log(err);
    }
  }

}
