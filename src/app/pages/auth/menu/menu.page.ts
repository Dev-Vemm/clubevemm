import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private util: UtilsService
   ) { }

  ngOnInit() {
  }

  alert(){
  	this.util.alertOpen('Em breve!');
  }

}
