import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-senha',
  templateUrl: './reset-senha.page.html',
  styleUrls: ['./reset-senha.page.scss'],
})
export class ResetSenhaPage implements OnInit {
	public email: any;
  constructor() { }

  ngOnInit() {
  }

  enviarEmail(email){
  	alert('Em breve');
  }

}
