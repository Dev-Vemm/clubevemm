import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  email: string;
  senha: string;
  nome: string;
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

  navigate(){
    this.router.navigateByUrl('/');
  }

  async cadastrar(nome, email, senha){
  	this.cadastrando = true;
  	try{
  		this.firebase.register(email, senha).then((fireRes) =>{
  			if(fireRes['user']){
  				let vals = {
  					uid: fireRes['user'].uid,
  					email: email,
  					nome: nome
  				};
  				this.data.requestPost(vals, 'cadastrar').then((APIres) =>{
  					if(APIres['status']){
              let arr = [
                {
                  'UID': APIres['dados'][0]['UID'],
                  'NOME': APIres['dados'][0]['NOME'],
                  'EMAIL': APIres['dados'][0]['EMAIL'],
                  'PONTOS': APIres['dados'][0]['PONTOS'],
                  'DATA_HORA_ENTRADA': APIres['dados'][0]['DATA_HORA_ENTRADA'],
                  'IMG': '',
                  'TIPO_PLANO': '',
                  'ONE_SIGNAL_ID': ''
                } 
              ];
              this.data.setStorage('USER', arr);
              this.cadastrando = false;
  						this.router.navigate(['menu']);
  					}
  				});
  			}
  		});
  	}catch(err){
  		console.log(err);
  	}
  }

}
