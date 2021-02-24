import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  loading: any;
  constructor(
  	private route: Router,
    private data: DataService
  ) { }

  ngOnInit() {
  }

  navigate(url){
  	this.route.navigate([url]);
  }

  loginVisitante(){
  	this.data.setStorage('USER', {visitante: true});
  }

}
