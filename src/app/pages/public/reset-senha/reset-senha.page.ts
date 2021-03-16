import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-senha',
  templateUrl: './reset-senha.page.html',
  styleUrls: ['./reset-senha.page.scss'],
})
export class ResetSenhaPage implements OnInit {
	public email: any;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  enviarEmail(email){
  	alert('Em breve');
  }

  navigate(){
    this.router.navigateByUrl('login');
  }

}
