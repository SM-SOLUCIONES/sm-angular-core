export class PaginateRelacionModel {
  public tipo: 'inner' | 'left' = 'inner';
  public hastaTabla: string = '';
  public hastaColumna: string = '';
  public desdeTabla: string = '';
  public desdeColumna: string = '';

  constructor(
    tipo: 'inner' | 'left',
    hastaTabla: string,
    hastaColumna: string,
    desdeTabla: string,
    desdeColumna: string
  ) {
    this.tipo = tipo;
    this.hastaTabla = hastaTabla;
    this.hastaColumna = hastaColumna;
    this.desdeTabla = desdeTabla;
    this.desdeColumna = desdeColumna;
  }
}
