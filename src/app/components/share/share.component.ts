import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { config } from '../../configs/config';
import { ShareEmailComponent } from '../share-email/share-email.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  public uid: any = this.navParam.data.uid;	
  private modal: any = this.navParam.data.modal;
  private mod: any;
  url = config.linkShare + this.uid;
  text = 'Você recebeu uma convite para ingressar no clube Vemm. Acesse ' + this.url + ' e aproveite.'
  
  constructor(
  	private navParam: NavParams, 
  	private socialSharing: SocialSharing, 
  	private modaCtrl: ModalController,
  	private data: DataService,
  	private toastCtrl: ToastController
  ) { }
  
  ngOnInit() {}

  voltar(){
  	this.modal.dismiss();
  }

  shareWhatsapp(){
    this.socialSharing.shareViaWhatsApp(this.text);
  }

  async sendEmail(){
  	this.mod = await this.modaCtrl.create({
      component: ShareEmailComponent,
      cssClass: 'share-email',
      componentProps: { modal: this.mod }
    });
    this.mod.onDidDismiss().then(async (data:any)=>{
    	console.log(data);
    	if(data.data.email){
    		let vals = {
    			email: data.data.email,
    			link: this.text
    		}
    		await this.data.requestPost(vals, 'email-share').then(()=>{
    			this.presentToast('E-mail enviado com sucesso.');
    		}).catch(()=>{
    			this.presentToast('Não foi possível enviar o e-mail');
    		});
    	}
    });
    return await this.mod.present();
  }

  async presentToast(msg: string){
  	const toast = await this.toastCtrl.create({
  		message: msg,
  		duration: 3500
  	});
  	toast.present();
  }
}
