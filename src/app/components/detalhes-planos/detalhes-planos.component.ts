import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-detalhes-planos',
  templateUrl: './detalhes-planos.component.html',
  styleUrls: ['./detalhes-planos.component.scss'],
})
export class DetalhesPlanosComponent implements OnInit {
  private modal: any = this.navParam.data.modal;
  public detalhes: any = this.navParam.data.detalhes;	
  constructor(
  	private navParam: NavParams
  ) { }

  ngOnInit() {}

  voltar(){
  	this.modal.dismiss();
  }

  async assinar(plano_id){
  	this.modal.dismiss({plano_id: plano_id});
  }

}
