import { Injectable } from '@angular/core';
import { Pixel } from '../interfaces/pixels';

@Injectable({
  providedIn: 'root'
})
export class GameoflifeService {

  private pixels: Pixel[] = [];
  private filas: number = 0;
  private columnas: number = 0;
  private _contadorGeneraciones=0; 
  private _densidadPoblacion=0.15; 
  private _filas=0;

  get contadorGeneraciones():number{
    return this._contadorGeneraciones;
  }

    get densidadPoblacion():number{
      return this._densidadPoblacion;
    }

    get getFilas():number{
      this._filas=this.filas;
      return this._filas;
    }

    setDensidadPoblacion(densidad:number){
      this._densidadPoblacion=densidad;
    }

    /**
   * Inicializa la cuadrícula con pixels muertos.   
   * Esta funcion se llamará en primer lugar.
   * @param filas Número de filas. por defecto son 10.
   * @param columnas Número de columnas. por defecto son 10.
   */
  iniciar(filas = 10 , columnas = 10){
    const tamMinimo = 5;
    if(filas < tamMinimo || columnas < tamMinimo){
      throw Error(`La altura y anchura deben ser al menos ${tamMinimo}.`);
    }

    this.filas = filas;
    this.columnas = columnas;
    this._contadorGeneraciones = 0;
    this.pixels = Array.from({
      length: filas * columnas
    }).map((_ , i , a) => 
    new Pixel(Math.floor(i / this.columnas), i % this.columnas));
  }
  

  /**
   * Hace que un porcentaje de pixels estén vivos, dependiendo de la tasa de entrada.
   * @param porcentajeVivo La cantidad de pixels que cobrarán vida. Un valor de
   * "0.2" significa que el 20% de los pixels de la cuadrícula se activarán Esto debe ser un
   * valor positivo no mayor que 1. El valor predeterminado es 0,2.
   */
  iniciarPixelsAleatoriamente(){
    if(!this.pixels){
      throw Error('La cuadrícula aún no se ha inicializado.');
    }

    this.reiniciar();
    this.pixels.forEach(pixel => {
      if(Math.random() < this._densidadPoblacion){
        pixel.cambiarEstado();
      }
    });
//no hace falta reiniciar los estados anteriores porque se esta iniciando desde 0
  }


 /**
   * Mata todos los pixels y pone el contador de generaciones a 0.
   */
  reiniciar(){
    if(!this.pixels){
      throw Error('La cuadrícula aún no se ha inicializado.');
    }

    this.pixels.forEach(pixel => pixel.reiniciar());
    this._contadorGeneraciones = 0;

  }

  /**
   *Obtiene todos los pixels como un array doble.
   * Cada subarray contiene todos los pixels que comparten la misma fila,
   *  ordenados por número de columna.
   *  Los subarray se ordenan por número de fila.
   */

  getCuadricula():Pixel[][]{
    if(!this.pixels){
      throw Error('La cuadrícula aún no se ha inicializado.');
    }

    const cuadricula=[];
      for (let i = 0; i < this.filas; i++) {
          cuadricula.push(this.pixels.slice(i * this.columnas, (i+1) * this.columnas));  
      }
      return cuadricula;
  }

//avanza el estado a la siguiente generación.
  siguienteGeneracion(){
    if(!this.pixels){
      throw Error('La cuadrícula aún no se ha inicializado.');
    }

     const vivo =true ;

     this.pixels.forEach(
       pixel => {
        const contadorVecinosVivos = this.getVecinos(pixel)
        .filter( c => c.isVivo())
        .length;

        switch (contadorVecinosVivos) {
          case 2:
            //el pixel mantiene el estado, no hace nada
            break;
    
          case 3:
            //si el pixel esta muerto vuelve a la vida, si está vivo no hace nada
            pixel.setEstadoTemporal(vivo);
            break;
          default:
              //si el pixel esta vivo muere , si esta muerto permanece
              pixel.setEstadoTemporal(!vivo);
            break;
        }
      });
      this._contadorGeneraciones++;
      this.actualizarEstadoPixels();
  }


  actualizarEstadoPixels(){
    this.pixels.forEach(pixel => pixel.actualizarEstadoActual());
  }


  getVecinos(pixel:Pixel):Pixel[]{
    if(this.estaFueraLimite(pixel.fila, pixel.columna)){
      throw Error('las coordenadas están fuera del array.');
    }

    const { fila, columna } = pixel;
    const coordenadasPosiblesVecinos = [
      { fila: fila  - 1, columna: columna },
      { fila: fila  - 1, columna: columna + 1 },
      { fila: fila , columna: columna + 1 },
      { fila: fila  + 1, columna: columna + 1 },
      { fila: fila  + 1, columna: columna },
      { fila: fila  + 1, columna: columna - 1 },
      { fila: fila , columna: columna - 1 },
      { fila: fila  - 1, columna: columna - 1}
    ].filter(pixel => !this.estaFueraLimite(pixel.fila, pixel.columna));

    return coordenadasPosiblesVecinos.map(coordenada => this.getPixelEspecifico(coordenada));

  }


 
  private getPixelEspecifico({fila = 0, columna = 0} = {}): Pixel {
    if (this.estaFueraLimite(fila, columna)) {
      throw Error(`las coordenadas están fuera del array. Límites: ${this.filas} rows, ${this.columnas} cols. valor: ${{fila, columna}}`);
    }

    return this.pixels[fila * this.columnas + columna];
  }

  private estaFueraLimite(fila: number, columna: number): boolean {
    return this.filaFueraLimite(fila) || this.columnaFueraLimite(columna);
  }

  private filaFueraLimite(fila: number) {
    return fila < 0 || this.filas <= fila;
  }

  private columnaFueraLimite(columna: number) {
    return columna < 0 || this.columnas <= columna;
  }

}
