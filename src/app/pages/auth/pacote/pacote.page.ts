import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { UtilsService } from '../../../services/utils.service';
import { NavParams, AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-pacote',
  templateUrl: './pacote.page.html',
  styleUrls: ['./pacote.page.scss'],
})
export class PacotePage implements OnInit {

  public usuario = {
    nome: '',
    email:'',
    plano: '',
    data_entrada: ''
  };
  private id: any;
  public historico = [];
  public pacotes: any = [];
  public plat: any;
  public segmento: string;
  public asset = 'assets/imgs/success.png';
  public origem;
  public destino;
  public dataInicial;
  public dataFinal;
  public descricao;
  public opcoes = [];
  public user;
  public opcionais = [
  	{valor: 'Transfer'},
  	{valor: 'Passeio'},
  	{valor: 'Voo'},
  	{valor: 'Ingressos'}
  ];

  public estados = [
  	{ uf: 'AC', nome: 'Acre' },
    { uf: 'AL', nome: 'Alagoas' },
    { uf: 'AP', nome: 'Amapá' },
    { uf: 'AM', nome: 'Amazonas' },
    { uf: 'BA', nome: 'Bahia' },
    { uf: 'CE', nome: 'Ceará' },
    { uf: 'DF', nome: 'Distrito Federal' },
    { uf: 'ES', nome: 'Espirito Santo' },
    { uf: 'GO', nome: 'Goiás' },
    { uf: 'MA', nome: 'Maranhão' },
    { uf: 'MS', nome: 'Mato Grosso do Sul' },
    { uf: 'MT', nome: 'Mato Grosso' },
    { uf: 'MG', nome: 'Minas Gerais' },
    { uf: 'PA', nome: 'Pará' },
    { uf: 'PB', nome: 'Paraíba' },
    { uf: 'PR', nome: 'Paraná' },
    { uf: 'PE', nome: 'Pernambuco' },
    { uf: 'PI', nome: 'Piauí' },
    { uf: 'RJ', nome: 'Rio de Janeiro' },
    { uf: 'RN', nome: 'Rio Grande do Norte' },
    { uf: 'RS', nome: 'Rio Grande do Sul' },
    { uf: 'RO', nome: 'Rondônia' },
    { uf: 'RR', nome: 'Roraima' },
    { uf: 'SC', nome: 'Santa Catarina' },
    { uf: 'SP', nome: 'São Paulo' },
    { uf: 'SE', nome: 'Sergipe' },
    { uf: 'TO', nome: 'Tocantins' }	
  ];
  constructor(
    private route: Router, 
    private activate: ActivatedRoute,
    private data: DataService, 
    private util: UtilsService,
    private platform: Platform,
    private alert: AlertController
  ) { }

  ngOnInit() {
    this.platform.ready().then(async ()=>{
      this.activate.queryParams.subscribe(params => {
        this.id = params['sub_off']; 
      });
      this.plat = (this.platform.width() >= 1025)? true : false;
      this.user = await this.data.getStorage('USER');
      this.usuario.data_entrada = this.user[0].DATA_HORA_ENTRADA;
      this.usuario.email = this.user[0].EMAIL;
      this.usuario.plano = this.user[0].TITULO;
      this.usuario.nome = this.user[0].NOME;
      this.loadContent();
    });
  }

  returnImg(img){
    return (img)? img : "url('assets/imgs/img1.jpg')";
  }

  requestImg(img){
    return (img)? 'https://painel.clubevemm.com.br/storage/app/' + img : '';
  }

  async loadContent(){
    await this.data.requestPost({uid: this.user[0].UID}, 'web-segmento').then((APIres:any)=>{
      this.historico = APIres.historico;
    });
  }

  options(val){
  	if(!this.opcoes.some(x => x == val)){
  		this.opcoes.push(val);
  	}else{
  		const index = this.opcoes.indexOf(val);
  		if(index > -1){
  			this.opcoes.splice(index, 1);
  		}
  	}
  }

  async finalizar(origem, destino, dataInicial, dataFinal, opcoes, descricao){
  	let vals = {
  		uid: this.user[0].UID,
  		oferta_id: this.id,
  		origem: origem,
  		destino: destino,
  		dataInicial: dataInicial,
  		dataFinal: dataFinal,
      descricao: descricao,
  		opcoes: opcoes.join(', ')
  	};
  	try{
  		await this.data.requestPost(vals, 'reservar').then(async ()=>{
  			await this.alertOpen('Seu pedido foi efetuado com sucesso! Em breve entraremos em contato.');
  		});
  	}catch(err){
  		console.log(err);
  	}
  }

  async alertOpen(msg){
    const alert = await this.alert.create({
      message: msg,
      buttons: [{
        text: 'OK',
        handler: ()=>{
          this.route.navigate(['menu/historico']);
        }      
      }]
     });
     await alert.present(); 
  }

  

}
