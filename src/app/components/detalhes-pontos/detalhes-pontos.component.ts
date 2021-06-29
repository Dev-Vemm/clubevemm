import { Component, OnInit } from '@angular/core';
import { NavParams, ToastController } from '@ionic/angular';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-detalhes-pontos',
  templateUrl: './detalhes-pontos.component.html',
  styleUrls: ['./detalhes-pontos.component.scss'],
})
export class DetalhesPontosComponent implements OnInit {

  private modal: any = this.navParam.data.modal;
  public detalhes: any = this.navParam.data.detalhes;	
  public favorito: boolean = false;
  public icon_favoritado: string = 'star-outline';

  public avalIcon1: string = 'star-outline';
  public avalIcon2: string = 'star-outline';
  public avalIcon3: string = 'star-outline';
  public avalIcon4: string = 'star-outline';
  public avalIcon5: string = 'star-outline';

  public comentario: any;
  public nota: number;
  public starColor: any = {
    color: '#000000',
    shadow: 'none'
  };
  constructor(private navParam: NavParams, private data: DataService, private toast: ToastController) { }

  ngOnInit() {
    if(this.detalhes.nota){
      console.log(this.detalhes.nota);
      this.avaliar(parseInt(this.detalhes.nota));
      this.comentario = this.detalhes.comentario;
    }
    if(this.detalhes.favorito){
      this.icon_favoritado = 'star';
    }
  }

  voltar(){
  	this.modal.dismiss({nota: this.nota, comentario: this.comentario, favorito: this.detalhes.favorito, status: this.detalhes.status});
  }

  async favoritar(){
    let vals = {uid: this.detalhes.uid, oferta: this.detalhes.oferta_id};
    let fav: any;
    let endpoint = '';
    if(this.detalhes.favorito){
      fav = 'star-outline';
      endpoint = 'desfavoritar';
      this.detalhes.favorito = null;
    }else{
      fav = 'star';
      endpoint = 'favoritar';
      this.detalhes.favorito = new Date().getTime();
    }
    this.data.requestPost(vals, endpoint);
    this.icon_favoritado = fav;
  }


  avaliar(estrelas){
    this.nota = estrelas;
    switch (estrelas) {
      case 1:
        this.starColor= {
          color: '#A8A300',
          shadow: 'none'
        };
        break;

      case 2:
        this.avalIcon1 = 'star';
        this.avalIcon2 = 'star';
        this.avalIcon3 = 'star-outline';
        this.avalIcon4 = 'star-outline';
        this.avalIcon5 = 'star-outline';
        this.starColor= {
          color: '#BDB600',
          shadow: 'none'
        };
        break;

      case 3:
        this.avalIcon1 = 'star';
        this.avalIcon2 = 'star';
        this.avalIcon3 = 'star';
        this.avalIcon4 = 'star-outline';
        this.avalIcon5 = 'star-outline';
        this.starColor= {
          color: '#D1CA00',
          shadow: 'none'
        };
        break;

      case 4:
        this.avalIcon1 = 'star';
        this.avalIcon2 = 'star';
        this.avalIcon3 = 'star';
        this.avalIcon4 = 'star';
        this.avalIcon5 = 'star-outline';
        this.starColor= {
          color: '#E6DE00',
          shadow: '#D6D640'
        };
        break;

      case 5:
        this.avalIcon1 = 'star';
        this.avalIcon2 = 'star';
        this.avalIcon3 = 'star';
        this.avalIcon4 = 'star';
        this.avalIcon5 = 'star';
        this.starColor= {
          color: '#FFF700',
          shadow: '#FFFF87'
        };
        break;
      
      default:
        this.avalIcon1 = 'star-outline';
        this.avalIcon2 = 'star-outline';
        this.avalIcon3 = 'star-outline';
        this.avalIcon4 = 'star-outline';
        this.avalIcon5 = 'star-outline';
        this.starColor= {
          color: '#000000',
          shadow: 'none'
        };
        break;
    }
  }

  async finalizar(nota, comentario){
    try{
      let vals = {
        uid: this.detalhes.uid, 
        oferta: this.detalhes.oferta_id,
        nota: nota,
        comentario: comentario
      };
      await this.data.requestPost(vals, 'avaliar').then(()=>{
        this.detalhes.nota = nota;
        this.detalhes.comentario = comentario;
      });
      await this.presentToast('Obrigado por avaliar.');
    }catch(err){
      await this.presentToast('Não foi possível enviar a avaliação.');
    }
  }

  async presentToast(msg: string){
    const toast = await this.toast.create({
      message: msg,
      duration: 3500
    });
    toast.present();
  }

}
