import { Component, OnInit } from '@angular/core';
import { Platform, LoadingController, ToastController } from '@ionic/angular';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.page.html',
  styleUrls: ['./dados.page.scss'],
})
export class DadosPage implements OnInit {
  data_nascimento: any = "";
  sexo: string = "";
  cpf: string = "";
  telefone: string = "";
  dependentes = [];
  loading: any;
  public plat: boolean;
  public user: any;
  public usuario:any = {
  	nome: '',
    deps: 0
  };
  public asset = 'assets/imgs/success.png';
  private uid: string;
  constructor(
    private data: DataService, 
    private platform: Platform, 
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
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
        deps: this.user[0].DEPENDENTES,
        avatar: this.requestAvatar(this.user[0].AVATAR),
        data_entrada: t.toLocaleString().split(' ').join(' - ')
      };
      this.uid = this.user[0].UID;
    });
  }

  requestAvatar(avatar){
    return (avatar)? 'https://painel.clubevemm.com.br/storage/app/public/avatars/' + avatar : 'assets/imgs/img-a.png';
  }

  async presentLoading(msg){
    this.loading = await this.loadingCtrl.create({
      message: msg,
      spinner: 'dots'
    });
    return this.loading.present();
  }

  async presentToast(msg){
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    return toast.present();
  }

  setSexo(val){
    this.sexo = val;
  }

  idade(dt) {
    var d = new Date,
    ano_atual = d.getFullYear(),
    mes_atual = d.getMonth() + 1,
    dia_atual = d.getDate(),

    ano_aniversario = parseInt(dt.split('/')[2]),
    mes_aniversario = parseInt(dt.split('/')[1]),
    dia_aniversario = parseInt(dt.split('/')[0]),

    quantos_anos = ano_atual - ano_aniversario;

    if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
      quantos_anos--;
    }

    return quantos_anos < 0 ? 0 : quantos_anos;
}

  async finalizar(dt, sexo, cpf, telefone, deps){
    await this.presentLoading("Aguarde enquanto finalizamos o seu cadastro");
    let check = true;
    let msg = "";
    if(dt == ""){
      msg = "Data de Nascimento precisa ser preenchida.";
      check = false;
    }
    if(sexo == ""){
      msg = "Sexo precisa ser preenchido.";
      check = false;
    }
    if(cpf == ""){
      msg = "CPF precisa ser preenchido.";
      check = false;
    }
    if(telefone == ""){
      msg = "Telefone precisa ser preenchido.";
      check = false;
    }
    if(telefone.length < 16 && telefone !== ""){
      msg = "Telefone inválido.";
      check = false;
    }
    if(dt.length < 10 && dt !== ""){
      msg = "Data de nascimento inválida.";
      check = false;
    }
    if(cpf.length < 14 && cpf !== ""){
      msg = "CPF inválido.";
      check = false;
    }
    deps.forEach((content, index) =>{
      if(content.nome == "" || content.nasc == "" || (this.idade(content.nasc) >= 18 && content.cpf == "")){
        check = false;
        msg = "Dependente " + (index + 1) + " possui dados a serem preenchidos.";
        return false;
      }
      if(this.idade(content.nasc) >= 18 && content.cpf.length < 14){
        check = false;
        msg = "CPF do dependente " + (index + 1) + " é inválido.";
        return false;
      }
      if(content.nasc.length < 10){
        check = false;
        msg = "Data de nascimento do dependente" + (index + 1) + " é inválida."; 
        return false;
      }
    });
    if(check == false){
      await this.presentToast(msg);
      this.loading.dismiss();
      return false;
    }
    let vals = {
      cpf: cpf,
      nasc: dt,
      telefone: telefone,
      sexo: sexo,
      deps: deps,
      uid: this.uid
    };
    try{
      let data = await this.data.requestPost(vals, 'finalizarDados');
      if(data != 1){
        await this.presentToast("Ocorreu algum erro!");
        return false;
      }
      this.user[0].TELEFONE = telefone;
      this.user[0].CPF = cpf;
      this.user[0].SEXO = sexo;
      this.user[0].NASCIMENTO = this.mySqlDate(dt);
      await this.data.setStorage('USER', this.user);
      this.router.navigate(['menu']);
    }catch(err){
      console.log(err);
      await this.presentToast("Não foi possível finalizar o seu cadastro.");
    }finally{
      this.loading.dismiss();
    }
    
  }

  addDeps(){
    if(this.dependentes.length >= this.usuario.deps){
      alert("Você pode cadastrar até "+this.usuario.deps+" dependentes");
      return false;
    }
    this.dependentes.push({
      nome: '',
      nasc: '',
      cpf: ''
    });
  }

  removeDeps(i){
    this.dependentes.splice(i, 1);
  }

  mySqlDate(dt){
    let data = dt.split('/');
    let newData = data[2] + '-' + data[1] + '-' + data[0];
    return newData;
  }

}
