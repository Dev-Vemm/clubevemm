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
  public bg = "url('assets/imgs/card-historico.png')";
  public usuario:any = {
  	nome: '',
  	email: '',
  	pontos: 0,
  	plano: '',
  	data_entrada: ''
  };
  public load: boolean = false;
  private modal: any;
  public user: any;
  public btnStatus: boolean = true;
  public btnHistorico: boolean = false;
  public historico:any = [];
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
      var a = this.user[0].DATA_HORA_ENTRADA.split(/[- :]/);
      // Apply each element to the Date function
      var d = new Date(a[0], a[1]-1, a[2], a[3], a[4], a[5]);
      var t = new Date(d);
      this.usuario = {
        nome: this.user[0].NOME,
        email: this.user[0].EMAIL,
        pontos: this.user[0].PONTOS,
        plano: this.user[0].TITULO,
        data_entrada: t.toLocaleString().split(' ').join(' - ')
      };
      this.loadContent(); 
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

  alterarContent(btn){
    if(btn == 1){
      this.btnStatus = false;
      this.btnHistorico = true;
    }else if(btn == 0){
      this.btnStatus = true;
      this.btnHistorico = false;
    }
  }

  async loadContent(){
    this.load = true;
    try{
      this.data.requestPost({uid: this.user[0].UID}, 'consumos').then((res:any) =>{
        if(res.historico){
          console.log(res.historico);
          this.historico = res.historico;   
        }
        this.load = false;
      });
    }catch(err){
      console.log(err);
      this.load = false;
    }
  }

  returnImg(img){
    return (img)? img : "url('assets/imgs/img1.jpg')";
  }

}
