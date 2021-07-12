import { Component, OnInit, ViewChild } from '@angular/core';
import { GameoflifeService } from './services/gameoflife.service';
import { ControlesComponent } from './components/controles/controles.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild(ControlesComponent) appControles: ControlesComponent | undefined;

  private rows = 50;
  private cols = 50;
  private ancho:number=0;
mostrar=true;
  constructor(private golService:GameoflifeService){  }

  ngOnInit(){
    this.golService.iniciar(this.rows, this.cols);
    this.golService.iniciarPixelsAleatoriamente();
    this.ancho=this.golService.getFilas;
  }

  

public minAncho : number = 0;
public maxAncho : number = 250;

get anchoMod() : number {
    return this.ancho;
}

set anchoMod(newValue : number) {
    this.ancho = newValue;
    if(this.ancho < this.minAncho){
        this.ancho = 0;
        setTimeout(() => {this.ancho = this.minAncho;});
    }
    else if(this.ancho > this.maxAncho){
        this.ancho = 0;
        setTimeout(() => {this.ancho = this.maxAncho;});
    }
}

actualizarTam(){
  this.appControles?.parar();
  this.mostrar=false;
  this.golService.iniciar(this.ancho,this.ancho);
  this.golService.iniciarPixelsAleatoriamente();
  setTimeout(() => {
    this.mostrar=true;
  }, 2000);
}



}
