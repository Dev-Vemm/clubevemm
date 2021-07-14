import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { DataService } from '../../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  email: string;
  senha: string;
  rSenha: string;
  codigo: string;
  block: boolean = false;
  nome: string;
  cadastrando: boolean = false;
  plat: any;
  url = 'assets/web/web-p.png';
  constructor(
    private firebase: FirebaseService, 
    private data: DataService, 
    private router: Router,
    private activate: ActivatedRoute,
    private platform: Platform,
    private toastCtrl: ToastController
    ) { }

  ngOnInit() {
    this.activate.queryParams.subscribe((params: any) => {
      if (params.cod) {
        this.codigo = params.cod;
        this.block = true;
      }
    });
    this.plat = (this.platform.width() >= 800)? true : false;
  }

  navigate(){
    this.router.navigateByUrl('/');
  }

  async presentToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
    });
    await toast.present();
  }

  async cadastrar(nome, email, senha, rSenha, codigo){
    if(senha !== rSenha){
      this.presentToast('As senhas devem sem iguais');
      return false;
    }
  	this.cadastrando = true;
  	try{
      let check = await this.checkCod(email, codigo);    
      if(!check){

        return false;
      }
  		this.firebase.register(email, senha).then((fireRes) =>{
  			if(fireRes['user']){
  				let vals = {
  					uid: fireRes['user'].uid,
  					email: email,
  					nome: nome,
            codigo: codigo
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
  		}).catch((err) =>{
        if(err['code'] == 'auth/invalid-email'){          
          this.presentToast('Formato de email inválido.');         
        }         
        if(err['code'] == 'auth/weak-password'){           
          this.presentToast('Senha fraca');         
        }         
        if(err['code'] == 'auth/email-already-in-use'){           
          this.presentToast("E-mail já cadastrado");         
        }
      });
  	}catch(err){
  		console.log(err);
  	}finally{
      this.cadastrando = false;
    }
  }

  async checkCod(email, codigo){
    if(!codigo){
      return true;
    }
    let codVals = {
      email: email,
      codigo: codigo
    }
    let cod: any = await this.data.requestPost(codVals, 'checkCod');
    console.log(cod);
    if(!cod.status){
      this.presentToast('Código inválido');
      return false;
    }else{
      return true;
    }
  }

}
