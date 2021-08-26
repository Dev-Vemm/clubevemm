import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NavParams } from '@ionic/angular';
import { Platform, ModalController } from '@ionic/angular';
import { DetalhesOfertasComponent } from '../detalhes-ofertas/detalhes-ofertas.component';

@Component({
  selector: 'app-ofertas-segmentos',
  templateUrl: './ofertas-segmentos.component.html',
  styleUrls: ['./ofertas-segmentos.component.scss'],
})
export class OfertasSegmentosComponent implements OnInit {
  private load: boolean = false;
  private modal: any = this.navParam.data.modal;
  public detalhes: any = this.navParam.data.detalhes;	
  private uid: any = this.navParam.data.uid;
  public ofertas: any = [];
  private modalOpen = false;
  public destaque: any;
  public vermais:boolean = false;
  constructor(
    private modaCtrl: ModalController,
    private navParam: NavParams, 
    private data: DataService
  ) { }

  ngOnInit() {
  	let request = (this.detalhes == 1)? true : false;
  	this.loadData(request);
  }

  voltar(){
  	this.modal.dismiss();
  }

  async addContent(seg){
    this.vermais = true;
    try{
      const vals = {
        uid: this.uid,
        segmento: seg
      };
      const ofertas:any = await this.data.requestPost(vals, 'requestMaisOfertas');
      var contador = 0;
      var limite = 2;
      for(var i = 0; i < ofertas.length; i++){
        if(!this.ofertas.some(y => y.oferta_id == ofertas[i].oferta_id)){
          if(contador < limite){
            this.ofertas.push(ofertas[i]);
            contador++;
          }
        }
      }
    }catch(err){
      console.log(err);
    }finally{
      this.vermais = false;
    }
  }

  async loadData(request){
  	this.load = true;
  	if(this.detalhes.id == 4){
      try{
        this.data.requestPost({uid: this.uid}, 'principal').then((APIres:any)=>{
          this.destaque = APIres.destaques;
        });
        this.load = false;
      }catch(err){
        this.load = false;
      }
      return false;
    }
    let endpoint = (request)? 'melhores/ofertas' : 'segmentos/ofertas';
  	let vals = (request)? {uid: this.uid} : {segmento: this.detalhes.id, uid: this.uid};
  	try{
  		this.data.requestPost(vals, endpoint).then((res) =>{
        	if(res){
            console.log(res);
        		this.ofertas = res;
        	}
	    }).then(()=>{
	        this.load = false;
	    });
  	}catch(err){
  		console.log(err);
  		this.load = false;
  	}
  }

  requestImg(img){
    return (img)? 'https://painel.clubevemm.com.br/storage/app/' + img : '';
  }

  async abrirDestaque(oferta, seg){
    if(this.modalOpen){
      this.modal.dismiss();
      this.modalOpen = false;
    }else{
      this.modalOpen = true;
      this.modal = await this.modaCtrl.create({
        component: DetalhesOfertasComponent,
        componentProps: { modal: this.modal, detalhes: oferta, temp: seg },
        cssClass: 'modal-oferta'
      });
      return await this.modal.present();
    }
  }

  bgImage(img){
    return (img)? img : "url('assets/imgs/img1.jpg')";
  }

  async favoritar(seg: any){
    let vals = {uid: this.uid, oferta: seg.oferta_id};
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

  async abrirDetalhes(oferta){
    let mod = await this.modaCtrl.create({
      component: DetalhesOfertasComponent,
      componentProps: { modal: this.modal, detalhes: oferta, temp: 1 },
      cssClass: 'modal-oferta'
    });
    mod.onDidDismiss().then((data: any)=>{
      if(data.data){
          this.adquirirOferta(data.data.oferta_id, this.uid, data.data.valor, data.data.produto);
      }
    });
    return await mod.present();
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
              //this.pontos = res[0].PONTOS;
              console.log(res);
              this.load = false;
              //this.route.navigate(['menu/pontos']);
            });
          }
        }
      });
    }catch(err){
      console.log(err);
      this.load = false;
    }
  }

}
