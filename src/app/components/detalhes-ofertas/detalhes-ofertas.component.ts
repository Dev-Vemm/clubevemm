import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, ModalController } from '@ionic/angular';
import { DetalhesComentariosComponent } from '../detalhes-comentarios/detalhes-comentarios.component';

@Component({
  selector: 'app-detalhes-ofertas',
  templateUrl: './detalhes-ofertas.component.html',
  styleUrls: ['./detalhes-ofertas.component.scss'],
})
export class DetalhesOfertasComponent implements OnInit {
  private modal: any = this.navParam.data.modal;
  public detalhes: any = this.navParam.data.detalhes;	
  private mod: any;
  constructor(
    private navParam: NavParams, 
    private alertCtrl: AlertController, 
    private modaCtrl: ModalController
  ) { }

  ngOnInit() {}

  voltar(){
  	this.modal.dismiss();
  }

  consumir(oferta_id, valor, produto){
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
  }

  returnImg(img){
    if(img){
      return img;
    }else{
      return "url('assets/imgs/img3.jpg')";
    }
  }

  async abrirComentarios(oferta, nome){
    this.mod = await this.modaCtrl.create({
      component: DetalhesComentariosComponent,
      componentProps: { modal: this.mod, detalhes: {oferta: oferta, nome: nome} }
    });
    return await this.mod.present();
  }

}
