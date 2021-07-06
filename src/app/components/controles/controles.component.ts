import { Component, OnInit } from '@angular/core';
import { GameoflifeService } from '../../services/gameoflife.service';

@Component({
  selector: 'app-controles',
  templateUrl: './controles.component.html',
  styles: [
  ]
})
export class ControlesComponent implements OnInit {

  private intervalId!:number;
  private _isFuncionando!: boolean;
  private densidadPoblacion:number=0;


  constructor(private golService:GameoflifeService) { }


  get isFuncionando(){
    return this._isFuncionando;
  }


  ngOnInit(): void {
 this.densidadPoblacion=this.golService.densidadPoblacion;

  }

  iniciar(){
    this.intervalId = window.setInterval(() => {
      this.golService.siguienteGeneracion();
    }, 100);
    this._isFuncionando=true;
  }

  parar(){
    window.clearInterval(this.intervalId);
    this._isFuncionando=false;
  }

  getContadorGeneraciones(){
    return this.golService.contadorGeneraciones;
  }

  reiniciar(){
    this.parar();
    this.golService.setDensidadPoblacion(this.densidadPoblacion);
    this.golService.reiniciar();  
    this.golService.iniciarPixelsAleatoriamente();
  }

  reiniciar0(){
    this.parar();
    this.golService.reiniciar();  
  }


public minDenPo:number=0;
public maxDenPo:number=0.90;


get densidadPoblacionMod() : number {
  return this.densidadPoblacion;
}

set densidadPoblacionMod(newValue : number) {
  this.densidadPoblacion = newValue;
  if(this.densidadPoblacion < this.minDenPo){
      this.densidadPoblacion = 0;
      setTimeout(() => {this.densidadPoblacion = this.minDenPo;});
  }
  else if(this.densidadPoblacion > this.maxDenPo){
      this.densidadPoblacion = 0;
      setTimeout(() => {this.densidadPoblacion = this.maxDenPo;});
  }
}




}
