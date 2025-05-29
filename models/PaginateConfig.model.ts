import { PaginateDataModel } from './PaginateData.model';

export class PaginateConfigModel {
  public data: PaginateDataModel = new PaginateDataModel();
  public page: number = this.data.number;
  public pageAnt: number = this.data.number;
  public size: number = 10;
  public sizeAnt: number = 10;
  public filtrosAnt: any;
  public showSizeSelector: boolean = true;
  public showSelectPaginate: boolean = true;
  public itemsPaginasSizes: number[] = [10, 15, 50, 100];

  constructor() {}

  // Las variables ...Ant obtienen los valores de sus respectivas variables
  // Esta funcion se usa cuando se realiza una busqueda o un llamado al paginado
  public actualizarAnt(filtros: any) {
    this.sizeAnt = this.size;
    this.pageAnt = this.page;
    this.filtrosAnt = JSON.parse(JSON.stringify(filtros));
  }

  // Comprueba si los ...Ant son iguales a sus variables originales
  // En caso de ser distintos signifa que se actualizo el paginado o los filtros
  public comprobarActualizacion(filtros: any) {
    if (
      JSON.stringify(this.filtrosAnt) != JSON.stringify(filtros) ||
      this.page != this.pageAnt ||
      this.size != this.sizeAnt
    )
      return true;
    else return false;
  }
}
