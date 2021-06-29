import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-segmentos',
  templateUrl: './segmentos.page.html',
  styleUrls: ['./segmentos.page.scss'],
})
export class SegmentosPage implements OnInit {
  public dataArr: any = [
  	{
  		EMPRESA: 'hotel 1',
  		NOTA: 4.9,
  		PONTOS: 3000
  	},
  	{
  		EMPRESA: 'hotel 2',
  		NOTA: 2.9,
  		PONTOS: 1000
  	},
  	{
  		EMPRESA: 'hotel 3',
  		NOTA: 5,
  		PONTOS: 15000
  	},
  	{
  		EMPRESA: 'hotel 4',
  		NOTA: 4.1,
  		PONTOS: 6000
  	}
  ]
  constructor(private route: Router) { }

  ngOnInit() {
  }

  navigate(url){
  	this.route.navigate([url]);
  }

}
