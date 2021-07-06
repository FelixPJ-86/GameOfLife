import { Component, OnInit } from '@angular/core';
import { GameoflifeService } from './services/gameoflife.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  rows = 50;
  cols = 50;

  constructor(private golService:GameoflifeService){  }

  ngOnInit(){
    this.golService.iniciar(this.rows, this.cols);
    this.golService.iniciarPixelsAleatoriamente();
  }


}
