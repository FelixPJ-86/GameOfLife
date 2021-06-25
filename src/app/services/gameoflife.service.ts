import { Injectable } from '@angular/core';
import { Pixel } from '../interfaces/pixels';

@Injectable({
  providedIn: 'root'
})
export class GameoflifeService {

  private pixels: Pixel[] = [];
  private rows: number = 0;
  private cols: number = 0;
  private _contadorGeneraciones=0; 

  get contadorGeneraciones():number{
    return this._contadorGeneraciones;
  }


    /**
   * Inicializa la cuadrícula con pixels muertos.   
   * Esta funcion se llamará en primer lugar.
   * @param rows Número de filas. por defecto son 10.
   * @param cols Número de columnas. por defecto son 10.
   */
  iniciar(rows = 10 , cols = 10){
    const tamMinimo = 5;
    if(rows < tamMinimo || cols < tamMinimo){
      throw Error(`La altura y anchura deben ser al menos ${tamMinimo}.`);
    }

    this.rows = rows;
    this.cols = cols;
    this._contadorGeneraciones = 0;
    this.pixels = Array.from({
      length: rows * cols
    }).map((_ , i , a) => 
    new Pixel(Math.floor(i / this.cols), i % this.cols));

  }
  

  /**
   * Hace que un porcentaje de pixels estén vivos, dependiendo de la tasa de entrada.
   * @param porcentajeVivo La cantidad de pixels que cobrarán vida. Un valor de
   * "0.2" significa que el 20% de los pixels de la cuadrícula se activarán Esto debe ser un
   * valor positivo no mayor que 1. El valor predeterminado es 0,2.
   */
  iniciarPixelsAleatoriamente(porcentajeVivo = 0.5){
    if(!this.pixels){
      throw Error('La cuadrícula aún no se ha inicializado.');
    }

    this.reiniciar();
    this.pixels.forEach(pixel => {
      if(Math.random() < porcentajeVivo){
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
      for (let i = 0; i < this.rows; i++) {
          cuadricula.push(this.pixels.slice(i * this.cols, (i+1) * this.cols));  
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
    if(this.isOutOfBounds(pixel.row, pixel.col)){
      throw Error('las coordenadas están fuera del array.');
    }

    const { row, col } = pixel;
    const coordenadasPosiblesVecinos = [
      { row: row - 1, col: col },
      { row: row - 1, col: col + 1 },
      { row: row, col: col + 1 },
      { row: row + 1, col: col + 1 },
      { row: row + 1, col: col },
      { row: row + 1, col: col - 1 },
      { row: row, col: col - 1 },
      { row: row - 1, col: col - 1}
    ].filter(offset => !this.isOutOfBounds(offset.row, offset.col));

    return coordenadasPosiblesVecinos.map(coordenada => this.getPixelEspecifico(coordenada));

  }


 
  private getPixelEspecifico({row = 0, col = 0} = {}): Pixel {
    if (this.isOutOfBounds(row, col)) {
      throw Error(`las coordenadas están fuera del array. Límites: ${this.rows} rows, ${this.cols} cols. valor: ${{row, col}}`);
    }

    return this.pixels[row * this.cols + col];
  }

  private isOutOfBounds(row: number, col: number): boolean {
    return this.isRowOutOfBounds(row) || this.isColOutOfBounds(col);
  }

  private isRowOutOfBounds(row: number) {
    return row < 0 || this.rows <= row;
  }

  private isColOutOfBounds(col: number) {
    return col < 0 || this.cols <= col;
  }

}
