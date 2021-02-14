import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.page.html',
  styleUrls: ['./busca.page.scss'],
})
export class BuscaPage implements OnInit {
  public lorem = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letr';
  public bg = "url('assets/imgs/cover.png')";
  public busca: any;
  constructor() { 
  	this.busca = [{
		nome: 'Hotel Paraíso Mar',
		custo: 50,
		img: "url('assets/imgs/img1.jpg')",
		produto: 'Diária quarto Casal',
		desc: this.returnDots(this.lorem)
	},{
		nome: 'Hotel Paraíso Mar',
		custo: 50,
		img: "url('assets/imgs/img1.jpg')",
		produto: 'Diária quarto Casal',
		desc: 'this.lorem'
	}];

  }

  ngOnInit() {
  }

  returnDots(string){
  	if(string.length > 50){
  		return string.substring(0, 47) + '...';
  	}else{
  		return string;
  	}
  }

}
