import { Component, OnInit } from '@angular/core';
import { OfertaCompraFinalComponent } from '../oferta-compra-final/oferta-compra-final.component';
import { NavParams, AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-oferta-compra',
  templateUrl: './oferta-compra.component.html',
  styleUrls: ['./oferta-compra.component.scss'],
})
export class OfertaCompraComponent implements OnInit {

  public detalhes: any = this.navParam.data.detalhes;	
  private oferta: any;
  public in: any;
  public out: any;
  public check: boolean = false;
  constructor(
    private navParam: NavParams, 
    private alertCtrl: AlertController, 
    private modaCtrl: ModalController
  ) { }

  ngOnInit() {}

  async finalizar(oferta_id){
    let modal = await this.modaCtrl.create({
      component: OfertaCompraFinalComponent,
      componentProps: {detalhes: {oferta: oferta_id} }
    });
    return await modal.present();
  }

  setOferta(){
  	this.check = (this.oferta < 1)? true : false;
  }

}
