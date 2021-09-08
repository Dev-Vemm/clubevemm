import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {
  usuario: any = {
    nome: '',
    nasc: '',
    cpf: '',
    plano: ''
  };
  plat: boolean;
  user: any;
  uid: string;
  vencimento: string;
  public asset = 'assets/imgs/success.png';
  constructor(
    private data: DataService, 
    private platform: Platform, 
  ) { }

  ngOnInit() {
    this.platform.ready().then(async ()=>{
      this.plat = (this.platform.width() >= 1025)? true : false;
      this.user = await this.data.getStorage('USER');
      var a = this.user[0].DATA_HORA_ENTRADA.split(/[- :]/);
      // Apply each element to the Date function
      var d = new Date(a[0], a[1]-1, a[2], a[3], a[4], a[5]);
      var t = new Date(d);
      this.usuario = {
        nome: this.user[0].NOME,
        nasc: this.returnDataFormatada(this.user[0].NASCIMENTO),
        cpf: this.user[0].CPF,
        email: this.user[0].EMAIL,
        pontos: this.user[0].PONTOS,
        plano: this.user[0].TITULO,
        avatar: this.requestAvatar(this.user[0].AVATAR),
        data_entrada: t.toLocaleString().split(' ').join(' - ')
      };
      this.vencimento = this.returnVencimento(this.user[0].DATA_HORA_ENTRADA.split(" ")[0]);

      this.uid = this.user[0].UID;
    });
  }

  requestAvatar(avatar){
    return (avatar)? 'https://painel.clubevemm.com.br/storage/app/public/avatars/' + avatar : 'assets/imgs/img-a.png';
  }

  returnDataFormatada(dt){
    let data = dt.split('-');
    let newData = data[2] + '/' + data[1] + '/' + data[0];
    return newData;
  }

  returnVencimento(dt){
    console.log(dt);
    let data = dt.split('-');
    data[0] = parseInt(data[0]) + 1;
    let newData = data[2] + '/' + data[1] + '/' + data[0];
    return newData;
  }

}
