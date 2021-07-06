import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Pixel } from '../../interfaces/pixels';
import { GameoflifeService } from '../../services/gameoflife.service';

@Component({
  selector: 'app-cuadricula',
  templateUrl: './cuadricula.component.html',
  styleUrls: ['./cuadricula.component.css']
})
export class CuadriculaComponent implements OnInit {
  cuadricula!:Pixel[][];

  constructor(private golService : GameoflifeService) { }

  ngOnInit() {
    this.cuadricula = this.golService.getCuadricula();
  }

  cambiarEstado(pixel: Pixel) {
    pixel.cambiarEstado();
  }

}
