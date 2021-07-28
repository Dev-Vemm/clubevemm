import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.page.html',
  styleUrls: ['./dados.page.scss'],
})
export class DadosPage implements OnInit {
  data_nascimento: any;
  sexo: string;
  cpf: string;
  telefone: string;
  public plat: boolean;
  public user: any;
  public usuario:any = {
  	nome: ''
  };
  private uid: string;
  constructor(
    private data: DataService, 
    private platform: Platform, 
    private firebase: FirebaseService,
    private router: Router,
    
  ) { }

  ngOnInit() {
    this.platform.ready().then(async ()=>{
      this.plat = (this.platform.width() >= 1025)? true : false;
      this.user = await this.data.getStorage('USER');
      this.usuario = {
        nome: this.user[0].NOME
      };
      this.uid = this.user[0].UID;
    });
  }

  setSexo(val){
    this.sexo = val;
  }

  async finalizar(){
    
  }

}
