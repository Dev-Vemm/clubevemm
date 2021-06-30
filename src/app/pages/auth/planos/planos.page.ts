import { Component, OnInit } from '@angular/core';
import { DetalhesPlanosComponent } from '../../../components/detalhes-planos/detalhes-planos.component';
import { ModalController, Platform } from '@ionic/angular';
import { DataService } from '../../../services/data.service';
import { Router, NavigationExtras } from '@angular/router';

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
  plat: any;
  tituloPlano: any;
  valorPlano: any;
  vantagens: any;
  tipoPlano: any;
  idPlano: any;
  constructor(
    private modaCtrl: ModalController,
    private data: DataService,
    private platform: Platform,
    private router: Router
  ) { }

  
  ngOnInit(){
    this.plat = (this.platform.width() >= 800)? true : false;
    this.platform.ready().then(async ()=>{
      this.user = await this.data.getStorage('USER');
      console.log(this.user);
      this.loadPlanos();
    });
  }

  async loadPlanos(){
    this.load = true;
    try{
      this.data.requestGet({}, 'planos').then((res: any) =>{
        if(res){
          var p = [];
          res.forEach((c: any, index) =>{  
            if(index == 0){
              this.tituloPlano = c.TITULO;
              this.valorPlano = c.VALOR.toFixed(2);
              this.vantagens = c.VANTAGENS.split(", ");
              this.tipoPlano = c.TIPO;
              this.idPlano = c.ID;
            }
            p.push({
              active: (index == 0)? true : false,
              DATA_CADASTRO: c.DATA_CADASTRO,
              DESC_ESPECIAL: c.DESC_ESPECIAL,
              GANHOS: c.GANHOS,
              ID: c.ID,
              TIPO: c.TIPO,
              TITULO: c.TITULO,
              VALOR: c.VALOR,
              VANTAGENS: c.VANTAGENS
            });
          });
          this.planos = p;
        }
      }).then(()=>{
        this.load = false;
      });
    }catch(err){
      console.log(err);
      this.load = false;
    }
  }

  detalhesPlano(plano, key){
    this.setActive(key);
    this.tituloPlano = plano.TITULO;
    this.valorPlano = plano.VALOR.toFixed(2);
    this.vantagens = plano.VANTAGENS.split(", ");
    this.tipoPlano = plano.TIPO;
    this.idPlano = plano.ID;
  }

  setActive(key){
    this.planos.forEach((c: any, index) =>{
      c.active = (index == key)? true : false;
    });
  }

  assinar(id, valor){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        uid: this.user[0].UID,
        email: this.user[0].EMAIL,
        plano: id,
        valor: valor    
      }
    };
    this.router.navigate(['pagamento'], navigationExtras);
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
          let navigationExtras: NavigationExtras = {
            queryParams: {
              uid: this.user[0].UID,
              email: this.user[0].EMAIL,
              plano: data.data.plano_id,
              valor: data.data.valor    
            }
          };
          this.router.navigate(['pagamento'], navigationExtras);
          //this.finalizaAssinatura(this.user[0].UID, data.data.plano_id);
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
