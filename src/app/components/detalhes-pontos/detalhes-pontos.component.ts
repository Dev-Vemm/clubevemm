import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';


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
  constructor(private navParam: NavParams) { }

  ngOnInit() {

  }

  voltar(){
  	this.modal.dismiss();
  }

  favoritar(){
  	if(this.favorito){
  		this.favorito = false;
  		this.icon_favoritado = 'star-outline';
  	}else{
  		this.favorito = true;
  		this.icon_favoritado = 'star';
  	}
  }

}
