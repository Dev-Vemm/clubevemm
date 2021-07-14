import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { UtilsService } from '../../../services/utils.service';
import { Platform } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';

class Especialidades{
  public ID: number;
  public ESPECIALIDADE: string;
}

class Cidade{
  public CIDADE: string;
}

@Component({
  selector: 'app-web-segmento',
  templateUrl: './web-segmento.page.html',
  styleUrls: ['./web-segmento.page.scss'],
})
export class WebSegmentoPage implements OnInit {
  public usuario = {
    nome: '',
    email:'',
    plano: '',
    data_entrada: ''
  };
  public user: any;
  public historico = [];
  public pacotes: any = [];
  public plat: any;
  public segmento: string;
  public exp: any = [];
  public asset = 'assets/imgs/success.png';
  public especialidades: Especialidades[];
  public especialidade: Especialidades;
  public municipios: Cidade[];
  public municipio: Cidade;
  public exames: any = [];
  constructor(
    private route: Router, 
    private data: DataService, 
    private util: UtilsService,
    private platform: Platform
  ) { }

  ngOnInit() {
    var url = this.route.url.split('/');
    this.segmento = (url[url.length - 1]);
    this.platform.ready().then(async ()=>{
      this.plat = (this.platform.width() >= 1025)? true : false;
      this.user = await this.data.getStorage('USER');
      this.usuario.data_entrada = this.user[0].DATA_HORA_ENTRADA;
      this.usuario.email = this.user[0].EMAIL;
      this.usuario.plano = this.user[0].TITULO;
      this.usuario.nome = this.user[0].NOME;
      await this.loadContent();
    });
  }

  ionViewWillEnter(){
    
  }

  returnImg(img){
    return (img)? img : "url('assets/imgs/img1.jpg')";
  }

  requestImg(img){
    return (img)? 'https://painel.clubevemm.com.br/storage/app/' + img : '';
  }

  async loadContent(){
    await this.data.requestPost({uid: this.user[0].UID}, 'web-segmento').then((APIres:any)=>{
      for(var i = 0; i < APIres['exp'].length; i += 3){
        this.exp.push({
          0: APIres.exp[i], 1: (APIres.exp[i+1])? APIres.exp[i+1] : null, 2: (APIres.exp[i+2])? APIres.exp[i+2] : null
        });
        this.pacotes.push({
          0: APIres.pacotes[i], 1: (APIres.pacotes[i+1])? APIres.pacotes[i+1] : null, 2: (APIres.pacotes[i+2])? APIres.pacotes[i+2] : null
        });
      }
      for(var i = 0; i < APIres['exames'].length; i += 3){
        this.exames.push({
          0: APIres.exames[i], 
          1: (APIres.exames[i+1])? APIres.exames[i+1] : null,
          2: (APIres.exames[i+2])? APIres.exames[i+2] : null
        });
      }
      this.especialidades = APIres.especialidades;
      this.municipios = APIres.municipios;
      console.log(this.especialidades);
      this.historico = APIres.historico;
    });
  }

  continuar(pacote){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          sub_off: pacote
      }
    };
    this.route.navigate(['menu/pacotes/contato'], navigationExtras);
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }

}
