import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { DataService } from '../../../services/data.service';
import { Platform } from '@ionic/angular';

declare var google:any;

@Component({
  selector: 'app-busca',
  templateUrl: './busca.page.html',
  styleUrls: ['./busca.page.scss'],
})
export class BuscaPage implements OnInit {

  map: any;
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  public lorem = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letr';
  public bg = "url('assets/imgs/cover.png')";
  public busca: any;
  public tabBusca: boolean = true;
  public tabMapa:boolean = false;
  public user: any;
  public pontos;
  constructor(
    private data: DataService, 
    private platform: Platform,
    private socket: Socket
  ) { 
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
    this.platform.ready().then(async ()=>{
      this.user = await this.data.getStorage('USER');
      this.pontos = this.user[0].PONTOS;
      
      this.socket.fromEvent('pontos-add').subscribe((data: any) =>{
        if(this.user[0].UID == data.user){
          this.data.getStorage('USER').then((store: any)=>{
            let update = store;
            update[0].PONTOS += parseInt(data.pontos);
            this.pontos = parseInt(update[0].PONTOS);

            this.data.setStorage('USER', update);
          });
        }
      });
    });
  }

  selecionaTab(tab){
    if(tab == 0){
      this.tabBusca = true;
      this.tabMapa = false;
    }else{
      this.tabBusca = false;
      this.tabMapa = true;
    }
  }

  ionViewDidEnter(){
    this.loadMapa();
  }

  async loadMapa(){
    const location = new google.maps.LatLng(-17.824858, 31.053028);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }

  returnDots(string){
    if(string.length > 50){
      return string.substring(0, 47) + '...';
    }else{
      return string;
    }
  }

}
