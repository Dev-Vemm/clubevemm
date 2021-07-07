import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public plat: any;
  constructor(
    private util: UtilsService,
    private platform: Platform
   ) { }

  ngOnInit() {
    this.plat = (this.platform.width() >= 1025)? true : false;
  }

  alert(){
  	this.util.alertOpen('Em breve!');
  }

}
