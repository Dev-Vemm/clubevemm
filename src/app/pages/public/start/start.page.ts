import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  loading: any;
  mobile: any;
  plat: any;
  url = 'assets/web/web-p.png';
  form = 'assets/web/form.png';
  constructor(
  	private route: Router,
    private data: DataService,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.mobile = (this.platform.is('cordova'))? true : false;
    this.plat = (this.platform.width() >= 800)? true : false;
  }

  navigate(url){
  	this.route.navigate([url]);
  }

  loginVisitante(){
  	this.data.setStorage('USER', {visitante: true});
  }

}
