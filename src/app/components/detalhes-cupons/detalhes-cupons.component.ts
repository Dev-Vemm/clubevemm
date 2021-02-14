import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-detalhes-cupons',
  templateUrl: './detalhes-cupons.component.html',
  styleUrls: ['./detalhes-cupons.component.scss'],
})
export class DetalhesCuponsComponent implements OnInit {
  private modal: any = this.navParam.data.modal;
  public detalhes: any = this.navParam.data.detalhes;	
  constructor(private navParam: NavParams) { }

  ngOnInit() {}

  voltar(){
  	this.modal.dismiss();
  }

}
