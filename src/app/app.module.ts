import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlesComponent } from './components/controles/controles.component';
import { CuadriculaComponent } from './components/cuadricula/cuadricula.component';
import { NumMaxMin } from './pipes/numMaxMin.pipe';
import { AnimacionCargaComponent } from './components/animacion-carga/animacion-carga.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlesComponent,
    CuadriculaComponent,
    NumMaxMin,
    AnimacionCargaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
