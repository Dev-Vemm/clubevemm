import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-share-email',
  templateUrl: './share-email.component.html',
  styleUrls: ['./share-email.component.scss'],
})
export class ShareEmailComponent implements OnInit {

  private modal: any = this.navParam.data.modal;
  public email: string;
  public error: boolean = false;
  constructor(private navParam: NavParams) { }

  ngOnInit() {}

  voltar(email?){
  	if(typeof email !== 'undefined'){
  		console.log(email);
  		if(this.checkIfEmail(email)){
  			this.modal.dismiss({email: email});
  		}else{
  			this.error = true;
  		}
  	}else{
  		this.modal.dismiss();
  	}
  }

  checkIfEmail(email){
  	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
