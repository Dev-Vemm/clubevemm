import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  senha: string;
  cadastrando: boolean = false;
  plat: any;
  url = 'assets/web/web-p.png';
  constructor(
    private firebase: FirebaseService, 
    private data: DataService, 
    private router: Router,
    private platform: Platform
    ) { }

  ngOnInit() {
    this.plat = (this.platform.width() >= 800)? true : false;
  }

  navigate(url){
    this.router.navigate([url]);
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
            if(APIres['status']){
              this.data.setStorage('USER', APIres['dados']);
              this.cadastrando = false;
              this.router.navigate(['menu']);
            }
          });
        }
      }).catch((err) =>{
        if(err['code']){
          if(err['code'] == 'auth/user-not-found'){
            console.log('Usuário não encontrado.');
          }
          if(err['code'] == 'auth/wrong-password'){
            console.log('Senha incorreta');
          }
        }
      });
      this.cadastrando = false;
    }catch(err){
      console.log(err);
      this.cadastrando = false;
    }
  }

}
