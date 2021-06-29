import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var google:any;
@Component({
  selector: 'app-oferta-mapa',
  templateUrl: './oferta-mapa.component.html',
  styleUrls: ['./oferta-mapa.component.scss'],
})
export class OfertaMapaComponent implements OnInit {
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

  constructor() { }

  ngOnInit() {}

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
    //this.adicionarMarcadores(this.markers);
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

}
