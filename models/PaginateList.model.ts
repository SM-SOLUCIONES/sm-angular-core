import { PaginateFiltroModel } from './PaginateFiltro.model';
import { PaginateOrdenModel } from './PaginateOrden.model';
import { PaginateParametroModel } from './PaginateParametro.model';
import { PaginateRelacionModel } from './PaginateRelacion.model';

export class PaginateListModel {
  public page: number;
  public size: number;

  public parametros: PaginateParametroModel[] = [];
  public filtros: PaginateFiltroModel[][] = [];
  public ordenes: PaginateOrdenModel[] = [];
  public relaciones: PaginateRelacionModel[] = [];

  constructor(page: number = 1, size: number = 10) {
    this.page = page;
    this.size = size;
  }

  // Agrega un parametro, si existe lo edita
  public addParametro(nombre: string, valor: string) {
    const parameter = new PaginateParametroModel(nombre, valor);
    for (let par of this.parametros) {
      if (par.nombre === nombre) {
        par.valor = valor;
        return;
      }
    }
    this.parametros.push(parameter);
  }

  // Agrega un filtro, si existe lo edita
  public addFiltro(
    tabla: string,
    columna: string,
    operacion: string,
    valor: string
  ) {
    const filtro = new PaginateFiltroModel(tabla, columna, operacion, valor);
    this.filtros.push([filtro]);
  }

  // Todos los filtros se agregan con un AND entre ellos
  public addFiltrosAnd(filtros: PaginateFiltroModel[]) {
    for (const filtro of filtros) {
      this.filtros.push([filtro]);
    }
  }

  // Todos los filtros se agregan con un OR entre ellos
  public addFiltrosOr(filtros: PaginateFiltroModel[]) {
    this.filtros.push(filtros);
  }

  // Agrega un orden. La prioridad la tienen los primeros agregados
  public addOrden(
    tabla: string = 't',
    columna: string,
    direccion: 'asc' | 'desc' = 'asc'
  ) {
    this.ordenes.push(new PaginateOrdenModel(tabla, columna, direccion));
  }

  // Agrega una relacion
  public addRelacion(
    tipo: 'inner' | 'left',
    hastaTabla: string,
    hastaColumna: string,
    desdeTabla: string,
    desdeColumna: string
  ) {
    this.relaciones.push(
      new PaginateRelacionModel(
        tipo,
        hastaTabla,
        hastaColumna,
        desdeTabla,
        desdeColumna
      )
    );
  }
}
