import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public bg = "url('assets/imgs/cover.png')";
  public usuario:any = {
  	nome: '',
  	email: '',
  	pontos: 0,
  	plano: '',
  	data_entrada: ''
  };
  public user: any;
  constructor(private data: DataService, private platform: Platform) { }

  ngOnInit() {
    this.platform.ready().then(async ()=>{
      this.user = await this.data.getStorage('USER');
      this.usuario = {
        nome: this.user[0].NOME,
        email: this.user[0].EMAIL,
        pontos: this.user[0].PONTOS,
        plano: this.user[0].TITULO,
        data_entrada: this.user[0].DATA_HORA_ENTRADA
      }; 
    });
  }

}
