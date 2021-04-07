import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, ModalController } from '@ionic/angular';
import { DetalhesComentariosComponent } from '../detalhes-comentarios/detalhes-comentarios.component';
import { OfertaCompraComponent } from '../oferta-compra/oferta-compra.component';
import { OfertaMapaComponent } from '../oferta-mapa/oferta-mapa.component';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalhes-ofertas',
  templateUrl: './detalhes-ofertas.component.html',
  styleUrls: ['./detalhes-ofertas.component.scss'],
})
export class DetalhesOfertasComponent implements OnInit {
  private modal: any = this.navParam.data.modal;
  public detalhes: any = this.navParam.data.detalhes;
  public temp: any = this.navParam.data.temp;	
  private mod: any;
  public n1 = '2137069608';
  public n2 = '21995884587';
  public n3 = '21995884587'; 
  txt = (this.temp == 1)? 'Para saber o localidades próximas, entre em contato com os números abaixo' : 'Para saber mais sobre as opções de pacote viagem, com até 60% de desconto:';
  constructor(
    private navParam: NavParams, 
    private alertCtrl: AlertController, 
    private modaCtrl: ModalController,
    private callNumber: CallNumber,
    private route: Router
  ) { }

  ngOnInit() {
  console.log(this.temp);}

  whats(num){
    window.open('https://api.whatsapp.com/send?phone='+num);
  }

  call(num){
    this.callNumber.callNumber(num, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  separa(str){
    var len = str.length;
    var ddd = str.substring(0, 2);
    if(len > 10){
      var set1 = str.substring(2, 3);
      var set2 = str.substring(3, 7);
      var set3 = str.substring(7, 11);
      var n = '('+ ddd +')' + ' ' + set1 + ' ' + set2 + '-' + set3;  
    }else{
      var set1 = str.substring(2, 6);
      var set2 = str.substring(6, 10);
      var n = '('+ ddd +')' + ' ' + set1 + '-' + set2;
    }
    return n;
  }

  voltar(){
  	this.modal.dismiss();
  }

  /*consumir(oferta_id, valor, produto){
    this.modal.dismiss({oferta_id: oferta_id, valor: valor, produto: produto});
  }

  async confirmar(oferta_id, valor, produto) {
    let alert = await this.alertCtrl.create({
      message: 'Deseja confirmar a aquisição da oferta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.consumir(oferta_id, valor, produto);
          }
        }
      ]
    });
    await alert.present();
  }*/

  async mapa(){
    let modal = await this.modaCtrl.create({
      component: OfertaMapaComponent
    });
    return await modal.present();
  }

  returnImg(img){
    if(this.detalhes.dimg){
      return 'https://painel.clubevemm.com.br/storage/app/' + this.detalhes.dimg;
    }
    if(img){
      return img;
    }else{
      return "assets/imgs/img3.jpg";
    }
  }

  async abrirComentarios(oferta, nome){
    this.mod = await this.modaCtrl.create({
      component: DetalhesComentariosComponent,
      componentProps: { modal: this.mod, detalhes: {oferta: oferta, nome: nome} }
    });
    return await this.mod.present();
  }

  async continuar(oferta_id){
    let modal = await this.modaCtrl.create({
      component: OfertaCompraComponent,
      componentProps: {detalhes: {oferta: oferta_id} }
    });
    return await modal.present();
  }

}
