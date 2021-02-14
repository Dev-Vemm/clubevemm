import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.page.html',
  styleUrls: ['./loja.page.scss'],
})
export class LojaPage implements OnInit {
  @ViewChild('slides', {static: false}) slides: IonSlides;
  public sliderOptions = {
  	pager: true,
    onlyExternal: true,
    autoHeight: false,
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
  }
  public segmentLoja: boolean = true;
  public segmentMapa: boolean = false;
  public segmentBtn: any = 'est';

  public imgs: any = [{
  	img: './assets/imgs/img1.jpg'
  },
  {
  	img: './assets/imgs/img2.jpg'
  },
  {
  	img: './assets/imgs/img3.jpg'
  },];

  public comentarios: any = [{
    usuario: 'User 1',
    nota: 4.5,
    comentario: 'Muito bom.'
  },
  {
    usuario: 'User 2',
    nota: 5,
    comentario: 'Excelente local. Atendimento perfeito.'
  },
  {
    usuario: 'User 3',
    nota: 2.5,
    comentario: 'Não gostei muito.'
  }];
  constructor() { }

  ngOnInit() {
  }

  segmentChange(){
  	if(this.segmentLoja){
  		this.segmentLoja = false;
  		this.segmentMapa = true;
  	}else{
  		this.segmentLoja = true;
  		this.segmentMapa = false;
  	}
  }

  slidesDidLoad(slides) {
    slides.startAutoplay();
  }

}
