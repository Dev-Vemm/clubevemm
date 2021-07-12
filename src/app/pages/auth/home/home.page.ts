import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { UtilsService } from '../../../services/utils.service';
import { Platform, ModalController } from '@ionic/angular';
import { DetalhesOfertasComponent } from '../../../components/detalhes-ofertas/detalhes-ofertas.component';
import { OfertasSegmentosComponent } from '../../../components/ofertas-segmentos/ofertas-segmentos.component';
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
    content: 'Hospedagem',
    id: 2
  },{
    icon: 'assets/imgs/icons/saude_btn.png',
    content: 'Saúde',
    id: 1
  },{
    icon: 'assets/imgs/icons/exp_btn.png',
    content: 'Experiências',
    id: 3
  },{
    icon: 'assets/imgs/icons/pacote_btn.png',
    content: 'Pacotes',
    id: 4
  }];

  public desk_segs = [
    {
      segmento: 'Saúde',
      link: 'saude',
      icon: 'assets/imgs/vemm_600x600_1.png'
    },
    {
      segmento: 'Hospedagem',
      link: 'hospedagem',
      icon: 'assets/imgs/vemm_600x600_4.png'
    },
    {
      segmento: 'Pacotes',
      link: 'pacotes',
      icon: 'assets/imgs/vemm_600x600_3.png'
    },
    {
      segmento: 'Experiências',
      link: 'experiencias',
      icon: 'assets/imgs/vemm_600x600_2.png'
    },
  ];

  public cupons:any = [];

  public melhoresOfertas: any;
  public user: any;
  public pontos: any = 0;
  public segmentos: any; 
  private modal: any;
  private modalOpen: boolean = false;
  public asset = 'assets/imgs/success.png';
  public destaque: any = [];
  mobile: any;
  load: boolean = false;
  visitante: boolean = false;
  plat: any;

  public ofertas_recentes = [];

  public usuario = {
    nome: '',
    email:'',
    plano: '',
    data_entrada: ''
  };

  public historico = [];

  constructor(
    private modaCtrl: ModalController,
    private route: Router, 
    private data: DataService, 
    private util: UtilsService,
    private platform: Platform,
    private socket: Socket
  ) { }

  ngOnInit() {
    this.platform.ready().then(async ()=>{
      this.plat = (this.platform.width() >= 1025)? true : false;
      this.mobile = (this.platform.is('cordova'))? true : false;
      this.user = await this.data.getStorage('USER');
      this.usuario.data_entrada = this.user[0].DATA_HORA_ENTRADA;
      this.usuario.email = this.user[0].EMAIL;
      this.usuario.plano = this.user[0].TITULO;
      this.usuario.nome = this.user[0].NOME;

      await this.loadContent();

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

      console.log(APIres)


      this.segmentos = APIres.segmentos;
      this.melhoresOfertas = APIres.melhores;
      this.cupons = APIres.destaques;
      this.ofertas_recentes = APIres.ofertas_recentes;
      this.historico = APIres.historico;
      this.destaque = APIres.pacote;
    });
  }

  openLink(link){
    this.route.navigate(['menu/' + link]);
  }

  limitar(str){
    return (str.length > 16)? str.substring(0, 15) + '...' : str;
  }

  requestImg(img){
    return (img)? 'https://painel.clubevemm.com.br/storage/app/' + img : '';
  }

  returnImg(img){
    return (img)? img : "url('assets/imgs/img1.jpg')";
  }

  navigate(url){
  	this.route.navigate([url]);
  }

  continuar(pacote){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          sub_off: pacote
      }
    };
    this.route.navigate(['menu/pacotes/contato'], navigationExtras);
  }

  returnDots(string){
  	if(string.length > 50){
  		return string.substring(0, 47) + '...';
  	}else{
  		return string;
  	}
  }

  async abrirDetalhes(oferta, seg){
    if(seg != 1 && seg != 0 && seg != 4 && seg != 6){
      await this.util.alertOpen('Em breve!');
      return false;
    }
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

  async verMais(btn){
    if(btn.id != 1 && btn.id != 4){
      await this.util.alertOpen('Em breve!');
      return false;
    }
    this.modal = await this.modaCtrl.create({
      component: OfertasSegmentosComponent,
      componentProps: { modal: this.modal, detalhes: btn, uid: this.user[0].UID },
      cssClass: 'modal-oferta'
    });
    return await this.modal.present();
  }

  async verMaisOfertas(tipo){
    this.modal = await this.modaCtrl.create({
      component: OfertasSegmentosComponent,
      componentProps: { modal: this.modal, detalhes: tipo, uid: this.user[0].UID },
      cssClass: 'modal-oferta'
    });
    return await this.modal.present();
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

  returnImgPadrao(img){
    return (img)? img : 'assets/imgs/success.png';
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