import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent  } from 'ionic2-calendar';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-resgate-detalhes',
  templateUrl: './resgate-detalhes.page.html',
  styleUrls: ['./resgate-detalhes.page.scss'],
})
export class ResgateDetalhesPage implements OnInit {
  public asset = 'assets/imgs/success.png';

  public star = 'star-outline';
  public fav = true;
  public mapa = false;

  public usuario = {
    email: 'victorbr321@gmail.com',
    plano: 'Platina',
    data_entrada: '15/03/2021 13:05:40'
  };

  public historico = [
    {
      IMG: '',
      TIPO: 1,
      TITULO: 'Hotel Paraíso Mar',
      DESCRICAO: 'Diária Quarto Casal',
      VALOR: 300    
    },{
      IMG: '',
      TIPO: 1,
      TITULO: 'Hotel Paraíso Mar',
      DESCRICAO: 'Diária Quarto Casal',
      VALOR: 300    
    },{
      IMG: '',
      TIPO: 1,
      TITULO: 'Hotel Paraíso Mar',
      DESCRICAO: 'Diária Quarto Casal',
      VALOR: 300    
    },{
      IMG: '',
      TIPO: 1,
      TITULO: 'Hotel Paraíso Mar',
      DESCRICAO: 'Diária Quarto Casal',
      VALOR: 300    
    }
  ];
  
  eventSource = [];
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    dateFormatter: {
        formatMonthViewDay: function(date:Date) {
            return date.getDate().toString();
        },
        formatMonthViewDayHeader: function(date:Date) {
			let str = date.toString().substring(0, 3);
            if(str == 'Mon'){
				return 'S';
		  	}
		  	if(str == 'Tue'){
		  		return 'T';
		  	}
		  	if(str == 'Wed'){
		  		return 'Q';
		  	}
		  	if(str == 'Thu'){
		  		return 'Q';
		  	}
		  	if(str == 'Fri'){
		  		return 'S';
		  	}
		  	if(str == 'Sat'){
		  		return 'S';
		  	}
		  	if(str == 'Sun'){
		  		return 'D';
		  	}
        },
        formatMonthViewTitle: function(date:Date) {
        	return 'testMT';
        },
        formatWeekViewDayHeader: function(date:Date) {
            return 'testWDH';
        },
        formatWeekViewTitle: function(date:Date) {
            return 'testWT';
        },
        formatWeekViewHourColumn: function(date:Date) {
            return 'testWH';
        },
        formatDayViewHourColumn: function(date:Date) {
            return 'testDH';
        },
        formatDayViewTitle: function(date:Date) {
            return 'testDT';
        }
    }
  };
  selectedDate: Date;
  mes_atual: string;

  @ViewChild('calendario', {static: false}) calendario: CalendarComponent;
  constructor(
    	@Inject(LOCALE_ID) private locale: string
    ) { }

  requestImg(img){
    return (img)? 'https://painel.clubevemm.com.br/storage/app/' + img : '';
  }

  returnImg(img){
    return (img)? img : "url('assets/imgs/img1.jpg')";
  }

  ngOnInit() {
  }

  async onEventSelected(event){
  	let data = new Date(event);
  	this.getMes(data.getMonth());
  }

  getMes(mes){
  	switch (mes) {
  		case 0:
  			this.mes_atual = 'Janeiro'
  			break;
  		
  		case 1:
  			this.mes_atual = 'Fevereiro'
  			break;
  		
  		case 2:
  			this.mes_atual = 'Março'
  			break;
  		
  		case 3:
  			this.mes_atual = 'Abril'
  			break;
  		
  		case 4:
  			this.mes_atual = 'Maio'
  			break;
  		
  		case 5:
  			this.mes_atual = 'Junho'
  			break;
  		
  		case 6:
  			this.mes_atual = 'Julho'
  			break;
  		
  		case 7:
  			this.mes_atual = 'Agosto'
  			break;
  		
  		case 8:
  			this.mes_atual = 'Setembro'
  			break;
  		
  		case 9:
  			this.mes_atual = 'Outubro'
  			break;
  		
  		case 10:
  			this.mes_atual = 'Novembro'
  			break;
  		
  		case 11:
  			this.mes_atual = 'Dezembro'
  			break;
  		
  		default:
  			// code...
  			break;
  	}
  }

  onViewTitleChanged(ev){
  	console.log(ev);
  }

  proximo(){
  	this.calendario.slideNext();
  }

  anterior(){
  	this.calendario.slidePrev();
  }

  favoritar(){
    if(this.fav){
      this.fav = false;
      return false;
    }
    this.fav = true;
  }

  abrirMapa(){
    if(this.mapa){
      this.mapa = false;
      return false;
    }
    this.mapa = true;
  }

}
