import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { UtilsService } from '../../services/utils.service';
import { NavParams, AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-oferta-destaque',
  templateUrl: './oferta-destaque.component.html',
  styleUrls: ['./oferta-destaque.component.scss'],
})
export class OfertaDestaqueComponent implements OnInit {
  public detalhes: any = this.navParam.data.detalhes;
  
  public origem;
  public destino;
  public dataInicial;
  public dataFinal;
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
    private navParam: NavParams,
  	private data: DataService,
  	private util: UtilsService,
    private platform: Platform
  ) { }

  ngOnInit() {
  	this.platform.ready().then(async ()=>{
  		this.user = await this.data.getStorage('USER');
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

  async finalizar(origem, destino, dataInicial, dataFinal, opcoes){
  	let vals = {
  		uid: this.user[0].UID,
  		oferta_id: this.detalhes.oferta,
  		origem: origem,
  		destino: destino,
  		dataInicial: dataInicial,
  		dataFinal: dataFinal,
  		opcoes: opcoes.join(', ')
  	};
  	try{
  		await this.data.requestPost(vals, 'reservar').then(async ()=>{
  			await this.util.alertOpen('Seu pedido foi efetuado com sucesso! Em breve entraremos em contato.');
  		});
  	}catch(err){
  		console.log(err);
  	}
  }

}
