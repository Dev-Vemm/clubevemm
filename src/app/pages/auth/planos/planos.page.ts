import { Component, OnInit } from '@angular/core';
import { DetalhesPlanosComponent } from '../../../components/detalhes-planos/detalhes-planos.component';
import { ModalController, Platform } from '@ionic/angular';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planos',
  templateUrl: './planos.page.html',
  styleUrls: ['./planos.page.scss'],
})
export class PlanosPage implements OnInit {
  public bg = "url('assets/imgs/cover.png')";
  private modal: any;
  private modalOpen: boolean = false;
  public planos: any;
  private user: any; 
  load: boolean = false;
  constructor(
    private modaCtrl: ModalController,
    private data: DataService,
    private platform: Platform,
    private router: Router
  ) { }

  
  ngOnInit(){
    this.platform.ready().then(async ()=>{
      this.user = await this.data.getStorage('USER');
      console.log(this.user);
      this.loadPlanos();
    });
  }

  async loadPlanos(){
    this.load = true;
    try{
      this.data.requestGet({}, 'planos').then((res) =>{
        if(res){
          this.planos = res;
        }
      }).then(()=>{
        this.load = false;
      });
    }catch(err){
      console.log(err);
      this.load = false;
    }
  }

  async abrirDetalhes(plano){
    if(this.modalOpen){
      this.modal.dismiss();
      this.modalOpen = false;
    }else{
      this.modalOpen = true;
      this.modal = await this.modaCtrl.create({
        component: DetalhesPlanosComponent,
        cssClass: 'modal-planos-detalhes',
        componentProps: { modal: this.modal, detalhes: plano }
      });
      this.modal.onDidDismiss().then((data: any)=>{
        if(this.modal){
          this.modalOpen = false;
        }
        if(data.data){
          this.finalizaAssinatura(this.user[0].UID, data.data.plano_id);
        }
      });
      return await this.modal.present();
    }
  }

  async finalizaAssinatura(UID, plano_id){
    this.load = true;
    try{
      this.data.requestPost({uid: UID, plano_id: plano_id}, 'contratar').then((res)=>{
        if(res){
          this.data.setStorage('USER', res).then(()=>{
            this.router.navigate(['menu']);
          });
        }
      });
    }catch(err){
      console.log(err);
    }
  }

}
