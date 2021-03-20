import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-ofertas-segmentos',
  templateUrl: './ofertas-segmentos.component.html',
  styleUrls: ['./ofertas-segmentos.component.scss'],
})
export class OfertasSegmentosComponent implements OnInit {
  private load: boolean = false;
  private modal: any = this.navParam.data.modal;
  public detalhes: any = this.navParam.data.detalhes;	
  private uid: any = this.navParam.data.uid;
  public ofertas: any = [];
  
  constructor(private navParam: NavParams, private data: DataService) { }

  ngOnInit() {
  	let request = (this.detalhes == 1)? true : false;
  	this.loadData(request);
  }

  voltar(){
  	this.modal.dismiss();
  }

  async loadData(request){
  	this.load = true;
  	let endpoint = (request)? 'melhores/ofertas' : 'segmentos/ofertas';
  	let vals = (request)? {uid: this.uid} : {segmento: this.detalhes.id, uid: this.uid};
  	try{
  		this.data.requestPost(vals, endpoint).then((res) =>{
        	if(res){
        		this.ofertas = res;
        	}
	    }).then(()=>{
	        this.load = false;
	    });
  	}catch(err){
  		console.log(err);
  		this.load = false;
  	}
  }

  bgImage(img){
    return (img)? img : "url('assets/imgs/img1.jpg')";
  }

  async favoritar(seg: any){
    let vals = {uid: this.uid, oferta: seg.oferta_id};
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
