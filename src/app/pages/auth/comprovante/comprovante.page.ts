import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comprovante',
  templateUrl: './comprovante.page.html',
  styleUrls: ['./comprovante.page.scss'],
})
export class ComprovantePage implements OnInit {
  public valor: any;
  public produto: any;
  
  constructor(private route: ActivatedRoute) {
  	this.route.params.subscribe(params => {
  		console.log(params);
	  	this.valor = params['valor'];
	  	this.produto = params['produto']; 
	});
  }

  ngOnInit() {
  }

}
