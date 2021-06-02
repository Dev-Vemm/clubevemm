import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { UtilsService } from '../../../services/utils.service';
import { Platform, ModalController, ToastController, LoadingController, PopoverController } from '@ionic/angular';
import { FirebaseService } from '../../../services/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ShareComponent } from '../../../components/share/share.component';
import { PerflFotoComponent } from '../../../components/perfl-foto/perfl-foto.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public bg = "url('assets/imgs/card-historico.png')";
  public usuario:any = {
  	nome: '',
  	email: '',
  	pontos: 0,
  	plano: '',
  	data_entrada: '',
    avatar: ''
  };
  public load: boolean = false;
  private modal: any;
  public user: any;
  public btnStatus: boolean = true;
  public btnHistorico: boolean = false;
  public btnSenha: boolean = false;
  public historico:any = [];

  public senhaAntiga: string;
  public senha: string;
  public rSenha: string;
  public senhaSec: boolean = true;
  public plat: boolean;
  public asset = 'assets/imgs/success.png';

  public btnsMenus = [{
    icon: 'assets/imgs/icons/hospedagem_btn.png',
    val: 6000
  },{
    icon: 'assets/imgs/icons/saude_btn.png',
    val: 3000
  },{
    icon: 'assets/imgs/icons/exp_btn.png',
    val: 2000
  },{
    icon: 'assets/imgs/icons/pacote_btn.png',
    val: 3500
  }];

  constructor(
    private data: DataService, 
    private platform: Platform, 
    private firebase: FirebaseService,
    private router: Router,
    private modaCtrl: ModalController,
    private popCtrl: PopoverController,
    private toastCtrl: ToastController,
    private activatedRoute: ActivatedRoute,
    private utils: UtilsService
  ) { }

  ngOnInit() {
    this.platform.ready().then(async ()=>{
      this.plat = (this.platform.width() >= 1025)? true : false;
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
        avatar: (this.user[0].AVATAR)? this.user[0].AVATAR : '',
        data_entrada: t.toLocaleString().split(' ').join(' - ')
      };
      this.activatedRoute.queryParams.subscribe(async params => {
      if (params.primeiro_acesso) {
          this.btnStatus = false;
          this.btnSenha = true;
          await this.utils.alertOpen('É recomendado trocar de senha após no primeiro acesso');
          this.data.requestPost({uid: this.user[0].UID}, 'primeira_senha');
        }
      });
      this.loadContent(); 
    });
  }

  async open(){
    let pop = await this.popCtrl.create({
      component: PerflFotoComponent,
      componentProps: {email: this.user[0].UID},
      translucent: true,
      mode: 'md'
    });
    pop.onDidDismiss().then((ds: any) =>{
      if(ds['data'].img){
        console.log(ds['data'].img);
        this.usuario.avatar = ds['data'].img;
      }
    });
    return await pop.present();
  }

  atualizaImg(){

  }

  async logout(){
    this.firebase.logout().then(async ()=>{
      await this.data.removeStorage('USER').then(()=>{
        this.router.navigate(['start']);
      });
    });
  }

  async share(){
    this.modal = await this.modaCtrl.create({
      component: ShareComponent,
      cssClass: 'share-email',
      componentProps: { uid: this.user[0].UID, modal: this.modal }
    });
    return await this.modal.present();
  }

  alterarContent(btn){
    if(btn == 1){
      this.btnStatus = false;
      this.btnHistorico = true;
      this.btnSenha = false;
    }else if(btn == 0){
      this.btnStatus = true;
      this.btnHistorico = false;
      this.btnSenha = false;
    }else if(btn == 2){
      this.btnStatus = false;
      this.btnHistorico = false;
      this.btnSenha = true;
    }
  }

  async loadContent(){
    this.load = true;
    try{
      this.data.requestPost({uid: this.user[0].UID}, 'consumos').then((res:any) =>{
        if(res.historico){
          this.historico = res.historico;   
        }
        this.load = false;
      });
    }catch(err){
      console.log(err);
      this.load = false;
    }
  }

  returnImg(img){
    return (img)? img : "url('assets/imgs/img1.jpg')";
  }

  checarSenha(){
    this.senhaSec = true;
    if(!this.senhaAntiga || this.senhaAntiga.length < 6){
      return false;
    }
    if(this.senha && this.rSenha){
      if(this.senha === this.rSenha){
        this.senhaSec = false;
      }
    }
  }

  async alterarSenha(senhaAntiga, senha, email){
    const result: any = await this.firebase.resetUserPassword(senhaAntiga, email, senha);
    if(!result){
      await this.utils.presentToast("Não foi possível alterar sua senha.");
      return false;
    }
    await this.utils.presentToast("Sua senha foi alterada com sucesso.");
  }

}
