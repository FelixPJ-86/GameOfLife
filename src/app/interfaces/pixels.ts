
export class Pixel {

    //estado actual del pixel
    private estadoActual=false;

    //propiedades para almacenar el estado 
    //despues de la actualización
    private estadoTemporal =false;
    private _fila: number;
    private _columna: number;

    // el estado muerto sera representado como 'false'
    // y el estado vivo como 'true'
    constructor(fila:number, columna:number){
        this._fila=fila;
        this._columna=columna;

    }

    get fila():number{
        return this._fila;
    }

    get columna():number{
        return this._columna;
    }

    setEstadoTemporal(estado:boolean){
        this.estadoTemporal=estado;
    }

    cambiarEstado(){
        this.estadoTemporal = !this.estadoTemporal;
        this.actualizarEstadoActual();
    }

    actualizarEstadoActual(){
        this.estadoActual=this.estadoTemporal
    }

    isVivo():boolean{
        return this.estadoActual;
    }

    reiniciar(){
        this.estadoActual   = false;
        this.estadoTemporal = false;
    }

}