import { Component, OnInit } from '@angular/core';
import { DetalhesCuponsComponent } from '../../../components/detalhes-cupons/detalhes-cupons.component';
import { ModalController, Platform } from '@ionic/angular';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-cupom',
  templateUrl: './cupom.page.html',
  styleUrls: ['./cupom.page.scss'],
})
export class CupomPage implements OnInit {
  public cupons: any;
  public ativos: any;
  public resgatados: any;
  public btnTodos: boolean = true;
  public btnAtivos: boolean = false;
  public btnResgatados: boolean = false;

  private modal: any;
  private modalOpen: boolean = false;

  public bg = "url('assets/imgs/cover.png')";
  public user:any;
  public pontos: any;
  public load: boolean = false;
  public favoritos: any;
  constructor(
  	private modaCtrl: ModalController,
    private platform: Platform,
    private data: DataService
  ){ 
  	this.cupons = [{
  		background: "url('assets/imgs/img1.jpg')",
  		img: "url('assets/imgs/img2.jpg')",
  		empresa: 'Hotel 1',
  		resgate: 10,
  		pontos: 4,
  		progresso: 4 / 10,
  		sobre: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make ',
  		detalhes: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make '
  	},{
  		background: "url('assets/imgs/img1.jpg')",
  		img: "url('assets/imgs/img2.jpg')",
  		empresa: 'Hotel 2',
  		resgate: 20,
  		pontos: 13,
  		progresso: 13 / 20,
  		sobre: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make ',
  		detalhes: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make '
  	},{
  		background: "url('assets/imgs/img1.jpg')",
  		img: "url('assets/imgs/img2.jpg')",
  		empresa: 'Hotel 2',
  		resgate: 20,
  		pontos: 20,
  		progresso: 20 / 20,
  		sobre: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make ',
  		detalhes: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make '
  	}];
  }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.platform.ready().then(async ()=>{
      this.user = await this.data.getStorage('USER');
      this.pontos = this.user[0].PONTOS;
      this.loadContent();
    });
  }

  async loadContent(){
    this.load = true;
    try{
      this.favoritos = await this.data.requestPost({uid: this.user[0].UID}, 'favoritos');
      console.log(this.favoritos);
      this.load = false;
    }catch(err){
      console.log(err);
    }
  }

  alterarContent(btn){
  	if(btn == 0){
  		this.btnResgatados = false;
  		this.btnAtivos = false;
  		this.btnTodos = true;
  	}else if(btn == 1){
  		this.btnResgatados = false;
  		this.btnAtivos = true;
  		this.btnTodos = false;
  	}else if(btn == 2){
  		this.btnResgatados = true;
  		this.btnAtivos = false;
  		this.btnTodos = false;
  	}
  }

  async abrirDetalhes(background, img, empresa, resgate, pontos, progresso, sobre, detalhes){
    if(this.modalOpen){
      this.modal.dismiss();
      this.modalOpen = false;
    }else{
      this.modalOpen = true;
      this.modal = await this.modaCtrl.create({
        component: DetalhesCuponsComponent,
        componentProps: { modal: this.modal, detalhes: {background: background, img: img, empresa: empresa, resgate: resgate, pontos: pontos, progresso: progresso, sobre: sobre, detalhes: detalhes} }
      });
      this.modal.onDidDismiss().then(()=>{
      	if(this.modal){
      		this.modal.dismiss();
          this.modalOpen = false;
      	}
      });
      return await this.modal.present();
    }
  }

  findImg(img, pos){
    if(pos == 1){
      return (img)? img : "url('assets/imgs/img1.jpg')";
    }else{
      return (img)? img : "url('assets/imgs/img2.jpg')";
    }
  }

  progresso(pontos, resgate){
    return pontos / resgate;
  }

}
