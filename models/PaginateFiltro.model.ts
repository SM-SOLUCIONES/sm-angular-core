export class PaginateFiltroModel {
  public tabla: string = "";
  public columna: string = "";
  public operacion: string = "";
  public valor: string = "";

  constructor(tabla: string, columna: string, operacion: string, valor: string) {
    this.tabla = tabla;
    this.columna = columna;
    this.operacion = operacion;
    this.valor = valor;
  }
}
