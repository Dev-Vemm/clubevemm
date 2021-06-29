import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oferta-compra-final',
  templateUrl: './oferta-compra-final.component.html',
  styleUrls: ['./oferta-compra-final.component.scss'],
})
export class OfertaCompraFinalComponent implements OnInit {
  img1 = 'assets/imgs/success.png';
  img2 = 'assets/imgs/fail.png';
  titulo1 = 'Obrigado por vir com a gente!';
  titulo2 = 'Moedas insuficientes...'
  texto1 = 'Boa Escolha! Aproveite sua oferta e esperamos você em breve.';
  texto2 = 'Convide amigos ou escolha um novo plano para conseguir mais.';
  cond = this.img2;
  texto = this.texto2;
  titulo = this.titulo2;
  constructor() { }

  ngOnInit() {}

  encerrar(){

  }

}
