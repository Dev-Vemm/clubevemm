import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { DetalhesPontosComponent } from '../../../components/detalhes-pontos/detalhes-pontos.component';
import { DataService } from '../../../services/data.service';
import { Socket } from 'ngx-socket-io';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pontos',
  templateUrl: './pontos.page.html',
  styleUrls: ['./pontos.page.scss'],
})
export class PontosPage implements OnInit {
  public pontos: number;
  public dataArr: any;
  public dataFav: any;
  public btnPontos: boolean = true;
  public btnFavoritos: boolean = false;
  public btnPacotes: boolean = false;
  public bg = "url('assets/imgs/cover.png')";
  public detalhesImg: any;
  public detalhesEmpresa: any;
  public detalhesProduto: any;
  public detalhesData: any;
  public detalhesPontos: any;
  public usuario:any = {
    nome: '',
    email: '',
    pontos: 0,
    plano: '',
    data_entrada: ''
  };
  private modal: any;
  private modalOpen: boolean = false;
  public historico: any;
  public pacotes: any;
  public load: boolean = false;
  public user: any;
  public uid: any;
  public index: any;
  constructor(
    private activatedRoute: ActivatedRoute,
  	private modaCtrl: ModalController,
    private platform: Platform,
    private data: DataService,
    private socket: Socket
  ) { 
  this.dataFav = [{
		EMPRESA: 'Clínica 1',
	  	IMG: "url('assets/imgs/img3.jpg')",
	  	PRODUTO: 'Produto 1',
	  	PONTO_GASTO: 3500
	},{
		EMPRESA: 'Hotel 2',
	  	IMG: "url('assets/imgs/img3.jpg')",
	  	PRODUTO: 'Produto 2',
	  	PONTO_GASTO: 3500

	},{
		EMPRESA: 'Clínica 3',
	  	IMG: "url('assets/imgs/img3.jpg')",
	  	PRODUTO: 'Produto 3',
	  	PONTO_GASTO: 3500
	}];
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.pacotes) {
        this.btnPontos = false;
        this.btnPacotes = true;
      }
    });
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
      this.socket.fromEvent('offer').subscribe((data: any) =>{
        if(data){
          let i = this.dataArr.findIndex(x => x.ID == data.oferta);
          if(i !== -1){
            let a = {
              DATA_HORA_GASTO: this.dataArr[i].DATA_HORA_GASTO,
              EMPRESA: this.dataArr[i].EMPRESA,
              ID: this.dataArr[i].ID,
              IMG: this.dataArr[i].IMG,
              PONTO_GASTO: this.dataArr[i].PONTO_GASTO,
              PRODUTO: this.dataArr[i].PRODUTO,
              STATUS: data.status, 
            }
            this.dataArr[i] = a;
            if(data.status == 2){
              this.data.getStorage('USER').then((dt) =>{
                if(dt[0].UID == data.uid){
                  let val = dt;
                  val[0].PONTOS = parseInt(val[0].PONTOS) + parseInt(data.retorno);
                  this.pontos = val[0].PONTOS;
                  this.data.setStorage('USER', val);
                }
              });
            }
          }
        }
      });
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
    });    
  }

  ionViewWillEnter(){
    this.platform.ready().then(async ()=>{
      this.user = await this.data.getStorage('USER');
      this.pontos = this.user[0].PONTOS;
      this.uid = this.user[0].UID;
      this.loadContent();
    });
  }

  status(status){
    if(status == 0){
      return "Em análise";
    }
    if(status == 1){
      return "Aguardando pagamento";
    }
    if(status == 2){
      return "Finalizado";
    }
    if(status == 3){
      return "Cancelado";
    }
  }

  async loadContent(){
    this.load = true;
    try{
      this.data.requestPost({uid: this.user[0].UID}, 'consumos').then((res:any) =>{
        if(res.consumos){
          this.dataArr = res.consumos;
        }
        console.log(this.dataArr);  
        if(res.historico){
          this.historico = res.historico;   
        }
        if(res.pacotes){
          this.pacotes = res.pacotes;
        }
        this.load = false;
      });
    }catch(err){
      console.log(err);
      this.load = false;
    }
  }

  returnImg(img){
    if(img){
      return img;
    }else{
      return "url('assets/imgs/img3.jpg')";
    }
  }

  returnBGC(status){
    if(status == 0){
      return '#FF9500';
    }else if(status == 1){
      return '#04D361';
    }else{
      return '#F71111';
    }
  }

  returnStatus(status){
    if(status == 0){
      return 'Pendente';
    }else if(status == 1){
      return 'Aprovado';
    }else{
      return 'Cancelado';
    }
  }

  alterarContent(btn){
  	if(btn == 0){
  		this.btnFavoritos = false;
  		this.btnPontos = true;
      this.btnPacotes = false;
  	}else if(btn == 1){
  		this.btnFavoritos = true;
  		this.btnPontos = false;
      this.btnPacotes = false;
  	}else if(btn == 2){
      this.btnFavoritos = false;
      this.btnPontos = false;
      this.btnPacotes = true;
    }
  }

  async abrirDetalhes(img, empresa, produto, pontos, data_hora, status, nota, comentario, favorito, oferta, index){
    if(this.modalOpen){
      this.modal.dismiss();
      this.modalOpen = false;
    }else{
      this.index = index;
      let det = {
        img: img, 
        empresa: empresa, 
        produto: produto, 
        pontos: pontos, 
        data_hora: data_hora, 
        status: status,
        nota: nota,
        comentario: comentario,
        favorito: favorito,
        uid: this.uid,
        oferta_id: oferta
      };
      this.modalOpen = true;
      this.modal = await this.modaCtrl.create({
        component: DetalhesPontosComponent,
        componentProps: { modal: this.modal, detalhes: det }
      });
      this.modal.onDidDismiss().then((data:any)=>{
        this.modalOpen = false;
      	if(this.modal){
      		this.modal.dismiss();
      	}
        if(data.data.status == 3){
          this.dataArr[this.index].COMENTARIO = data.data.comentario;
          this.dataArr[this.index].NOTA = data.data.nota;
          this.dataArr[this.index].FAVORITO = data.data.favorito;
        }else{
          this.dataArr[this.index].FAVORITO = data.data.favorito;
        }
      });
      return await this.modal.present();
    }
  }

}
