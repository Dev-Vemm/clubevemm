import { Injectable } from '@angular/core';
import { Platform, ModalController, ToastController, AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
  	private modal: ModalController,
  	private toast: ToastController,
  	private alert: AlertController
  ) { }

  async modalOpen(component, detalhes, dismiss){
  	let modal = await this.modal.create({
        component: component,
        componentProps: { detalhes: detalhes } 
    });
    modal.onDidDismiss().then(()=>{
      	dismiss();
    });
    return await modal.present();
  }

  async alertOpen(msg){
  	const alert = await this.alert.create({
    	message: msg,
    	buttons: ['OK']
   	});
   	await alert.present(); 
  }
}
