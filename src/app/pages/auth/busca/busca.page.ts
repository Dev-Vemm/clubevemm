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
  markers = [
    {
      title: 'Natial Art Galery',
      latitude: "-17.824991",
      longitude: "31.049295"
    },
    {
      title: 'West End Hospital',
      latitude: "-17.820987",
      longitude: "31.039682"
    },
    {
      title: 'Dominican Convent School',
      latitude: "-17.822647",
      longitude: "31.052042"
    },
    {
      title: 'Chop Chop Brazilian Steakhouse',
      latitude: "-17.819460",
      longitude: "31.053884"
    }

  ];
  infoWindows: any = [];
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
      zoom: 13,
      disableDefaultUI: true
    }
    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|8011CC" ,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
    let minhaPos = new google.maps.Marker({
      position: location,
      icon: pinImage,
      title: 'Minha posição'
    });
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    minhaPos.setMap(this.map);
    this.adicionarMarcadores(this.markers);
  }

  addInfoMapa(marker){
    let info =  "<div class='infoContent'>" +
                  "<h2 class='headerInfo'>" + marker.title + "</h2>" +
                "</div>";   

    let infoWindow = new google.maps.InfoWindow({
      content: info
    });

    marker.addListener('click', ()=>{
      this.fecharJanelas();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }

  fecharJanelas(){
    for(let window of this.infoWindows){
      window.close();
    }
  }

  adicionarMarcadores(marcadores){
    for(let marker of marcadores){
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude
      });
      mapMarker.setMap(this.map);
      this.addInfoMapa(mapMarker);
    }
  }

  returnDots(string){
    if(string.length > 50){
      return string.substring(0, 47) + '...';
    }else{
      return string;
    }
  }

}
