export class PaginateOrdenModel {
  public tabla: string = 't';
  public columna: string = 'id';
  public direccion: 'asc' | 'desc' = 'desc';

  constructor(
    tabla: string,
    columna: string,
    direccion: 'asc' | 'desc' = 'desc'
  ) {
    this.tabla = tabla;
    this.columna = columna;
    this.direccion = direccion;
  }
}
