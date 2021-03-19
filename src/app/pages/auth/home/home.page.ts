import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Platform, ModalController } from '@ionic/angular';
import { DetalhesOfertasComponent } from '../../../components/detalhes-ofertas/detalhes-ofertas.component';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public lorem = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letr';
  public bg = "url('assets/imgs/cover.png')";
  public btnsMenus = [{
    icon: 'assets/imgs/icons/hospedagem_btn.png',
    content: 'Hospedagem'
  },{
    icon: 'assets/imgs/icons/saude_btn.png',
    content: 'Saúde'
  },{
    icon: 'assets/imgs/icons/exp_btn.png',
    content: 'Experiências'
  }];
  public cupons = [{
  	img: "url('assets/imgs/img1.jpg')",
  	desc: 20
  },{
  	img: "url('assets/imgs/img2.jpg')",
  	desc: 30
  },{
  	img: "url('assets/imgs/img3.jpg')",
  	desc: 40
  },{
    img: "url('assets/imgs/img3.jpg')",
    desc: 40
  },{
    img: "url('assets/imgs/img3.jpg')",
    desc: 40
  }];

  public melhoresOfertas = [{
  	nome: 'oferta 1',
  	img: "url('assets/imgs/img1.jpg')",
  	price: 20
  },{
  	nome: 'oferta 2',
  	img: "url('assets/imgs/img2.jpg')",
  	price: 30
  },{
  	nome: 'oferta 3',
  	img: "url('assets/imgs/img3.jpg')",
  	price: 40
  },{
    nome: 'oferta 2',
    img: "url('assets/imgs/img2.jpg')",
    price: 30
  },{
    nome: 'oferta 3',
    img: "url('assets/imgs/img3.jpg')",
    price: 40
  }];
  public user: any;
  public pontos: any = 0;
  public segmentos: any; 
  private modal: any;
  private modalOpen: boolean = false;
  load: boolean = false;
  visitante: boolean = false;
  constructor(
    private modaCtrl: ModalController,
    private route: Router, 
    private data: DataService, 
    private platform: Platform,
    private socket: Socket
  ) { }

  ngOnInit() {
    this.platform.ready().then(async ()=>{
      this.user = await this.data.getStorage('USER');
      this.loadContent();
      if(this.user.vistante){
        this.visitante = true;
      }else{
        this.pontos = this.user[0].PONTOS;  
        this.socket.fromEvent('pontos-add').subscribe((data: any) =>{
          if(this.user[0].UID == data.user){
            this.data.getStorage('USER').then((store: any)=>{
              let update = store;
              update[0].PONTOS += parseInt(data.pontos);
              this.pontos = parseInt(update[0].PONTOS);

              this.data.setStorage('USER', update);
            });
          }
        });
      }
    });
  }

  async loadContent(){
    this.data.requestPost({uid: this.user[0].UID}, 'principal').then((APIres:any)=>{
      this.segmentos = APIres;
    });
  }

  navigate(url){
  	this.route.navigate([url]);
  }

  returnDots(string){
  	if(string.length > 50){
  		return string.substring(0, 47) + '...';
  	}else{
  		return string;
  	}
  }

  async abrirDetalhes(oferta){
    if(this.modalOpen){
      this.modal.dismiss();
      this.modalOpen = false;
    }else{
      this.modalOpen = true;
      this.modal = await this.modaCtrl.create({
        component: DetalhesOfertasComponent,
        componentProps: { modal: this.modal, detalhes: oferta },
        cssClass: 'modal-oferta'
      });
      this.modal.onDidDismiss().then((data: any)=>{
        if(this.modal){
          this.modalOpen = false;
        }
        if(data.data){
          this.adquirirOferta(data.data.oferta_id, this.user[0].UID, data.data.valor, data.data.produto);
        }
      });
      return await this.modal.present();
    }
  }

  async adquirirOferta(oferta_id, UID, valor, produto){
    this.load = true;
    try{
      this.data.requestPost({oferta: oferta_id, uid: UID, valor: valor}, 'adquirir').then((res: any)=>{
        if(res){
          if(res['block']){
            console.log('Você não tem pontos o suficiente para adquirir essa oferta.');
          }else{
            this.data.setStorage('USER', res).then(()=>{
              this.pontos = res[0].PONTOS;
              console.log(res);
              this.load = false;
              this.route.navigate(['menu/pontos']);
            });
          }
        }
      });
    }catch(err){
      console.log(err);
      this.load = false;
    }
  }

  bgImage(img){
    return (img)? img : "url('assets/imgs/img1.jpg')";
  }

  async favoritar(seg: any){
    let vals = {uid: this.user[0].UID, oferta: seg.oferta_id};
    let fav: any;
    let endpoint = '';
    if(seg.favorito){
      fav = null;
      endpoint = 'desfavoritar';
    }else{
      fav = seg.oferta_id;
      endpoint = 'favoritar';
    }
    this.data.requestPost(vals, endpoint);
    seg.favorito = fav;
  }

}
