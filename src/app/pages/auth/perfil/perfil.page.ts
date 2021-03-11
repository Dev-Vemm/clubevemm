import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Platform, ModalController } from '@ionic/angular';
import { FirebaseService } from '../../../services/firebase.service';
import { Router } from '@angular/router';
import { ShareComponent } from '../../../components/share/share.component';

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
  private modal: any;
  public user: any;
  constructor(
    private data: DataService, 
    private platform: Platform, 
    private firebase: FirebaseService,
    private router: Router,
    private modaCtrl: ModalController
  ) { }

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

  async logout(){
    this.firebase.logout().then(async ()=>{
      await this.data.removeStorage('USER').then(()=>{
        this.router.navigate(['start']);
      });
    });
  }

  async share(){
    this.modal = await this.modaCtrl.create({
      component: ShareComponent,
      cssClass: 'share-email',
      componentProps: { uid: this.user[0].UID, modal: this.modal }
    });
    return await this.modal.present();
  }

}
