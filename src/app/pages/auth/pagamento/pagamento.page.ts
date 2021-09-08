import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { UtilsService } from '../../../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {
  public uid;
  public plano_id;
  public valor;
  public email;
  public nomeTitular;
  public numCartao;
  public bandeira;
  public validade;
  public codigo;
  public cadastrando: boolean = false;
  c1 = false;
  c2 = false;
  c3 = false;
  c4 = false;
  c5 = false;
  public bandeiras = [
  	{
  		nome: 'Visa',
  		verify: 'VISA'
  	},{
  		nome: 'Mastercard',
  		verify: 'MASTER'
  	},{
  		nome: 'American Express',
  		verify: 'AMEX'
  	},{
  		nome: 'Elo',
  		verify: 'ELO'
  	},{
  		nome: 'Diners Club',
  		verify: 'DINERS'
  	},{
  		nome: 'Discover',
  		verify: 'DISCOVER'
  	},{
  		nome: 'JCB',
  		verify: 'JCB'
  	},{
  		nome: 'AURA',
  		verify: 'AURA'
  	}
  ];
  url = 'assets/web/web-p.png';
  public plat: any;
  constructor(
  	private data: DataService,
    private util: UtilsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.plat = (this.platform.width() >= 800)? true : false;
  	this.platform.ready().then(() =>{
  		this.activatedRoute.queryParams.subscribe((params) => {
  			if (params.uid) {
	          	this.uid = params.uid;
              this.email = params.email;
	          	this.plano_id = params.plano;
	          	this.valor = params.valor
	        }
	    });
  	});
  }

  navigate(){
    this.router.navigateByUrl('/planos');
  }

  resetCampos(){
    this.c1 = false;
    this.c2 = false;
    this.c3 = false;
    this.c4 = false;
    this.c5 = false;
  }

  async efetuarPagamento(uid, plano, email, valor, nomeCartao, numeroCartao, bandeira, mesExpiracao, CC){
    this.resetCampos();
    this.cadastrando = true;
  	if(!nomeCartao){
      this.c1 = true;
      return false;
    }
    if(!numeroCartao){
      this.c2 = true;
      return false;
    }
    if(!bandeira){
      this.c3 = true;
      return false;
    }
    if(!mesExpiracao){
      this.c4 = true;
      return false;
    }
    if(!CC){
      this.c5 = true;
      return false;
    }
    let cartao = numeroCartao.replace(' ', '');
    let dataValidade = mesExpiracao.split('/');
    let dV = dataValidade[0] + '/20' +dataValidade[1]; 
    try{
  		let vals = {
  			uid: uid,
  			plano_id: plano,
        email: email,
  			valor_plano: valor,
  			nome_cartao: nomeCartao,
  			numero_cartao: cartao,
  			brand: bandeira,
  			data_validade: dV,
  			cod_cartao: CC
  		};
  		await this.data.requestPost(vals, 'pagamento').then((res: any) =>{
  			if(res.payment.status == 2){
  				this.data.requestPost({uid: uid, plano_id: plano, email: email}, 'contratar').then((res)=>{
			        if(res){
                this.data.setStorage('USER', res).then(()=>{
			            this.util.alertOpen('Pagamento realizado com sucesso').then(()=>{
                    this.router.navigate(['menu']);
                  });
			          });
			        }
			    });
  			}else{
          this.util.alertOpen('Não foi possível realizar o pagamento');
        }
  		}).catch((err) =>{
  			this.router.navigate(['planos']);
  		});
  		this.cadastrando = false;
  	}catch(err){
  		this.cadastrando = false;
  		this.router.navigate(['planos']);
  	}
  }

}
