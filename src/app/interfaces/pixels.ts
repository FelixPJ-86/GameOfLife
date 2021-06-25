
export class Pixel {

    //estado actual del pixel
    private estadoActual=false;

    //propiedades para almacenar el estado 
    //despues de la actualización
    private estadoTemporal =false;
    private _row: number;
    private _col: number;

    // el estado muerto sera representado como 'false'
    // y el estado vivo como 'true'
    constructor(row:number, col:number){
        this._row=row;
        this._col=col;

    }

    get row():number{
        return this._row;
    }

    get col():number{
        return this._col;
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