import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NavParams } from '@ionic/angular';


@Component({
  selector: 'app-detalhes-comentarios',
  templateUrl: './detalhes-comentarios.component.html',
  styleUrls: ['./detalhes-comentarios.component.scss'],
})
export class DetalhesComentariosComponent implements OnInit {
  private load: boolean = false;
  private modal: any = this.navParam.data.modal;
  public detalhes: any = this.navParam.data.detalhes;	
  public comentarios: any ;
  constructor(private navParam: NavParams, private data: DataService) { }

  ngOnInit() {
  	this.loadData();
  }

  voltar(){
  	this.modal.dismiss();
  }

  async loadData(){
  	this.load = true;
  	try{
  		this.data.requestPost({oferta: this.detalhes.oferta}, 'avaliacoes/oferta').then((res) =>{
        	if(res){
        		console.log(res);
          		this.comentarios = res;
        	}
	    }).then(()=>{
	        this.load = false;
	    });
  	}catch(err){
  		console.log(err);
  		this.load = false;
  	}
  }

  checkColor(nota){
    switch (nota) {
      case 1:
        return '#A8A300';
        break;

      case 2:
        return '#BDB600';
        break;

      case 3:
        return '#D1CA00';
        break;

      case 4:
        return '#E6DE00';
        break;

      case 5:
        return '#FFF700';
        break;
      
      default:
        return '#000000';
        break;
    }
  }

  checkShadow(nota){
    switch (nota) {
      case 1:
        return 'none';
        break;

      case 2:
        return 'none';
        break;

      case 3:
        return 'none';
        break;

      case 4:
        return '#D6D640';
        break;

      case 5:
        return '#FFFF87';
        break;
      
      default:
        return '#000000';
        break;
    }
  }

}
