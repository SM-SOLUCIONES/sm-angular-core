// Removed unused import of List from lodash
import { PaginateOrderModel } from './PaginateOrder.model';
import { PaginateParametersModel } from './PaginateParameters.model';
/**
 * Es un modelo para enviar a un recurso con paginate
 *
 */
export class PaginateListModel {
  public page: number;
  public size: number;

  public paginateParametersList: PaginateParametersModel[] = [];
  public orderFieldsList: PaginateOrderModel[] = [];

  constructor(parPage: number = 0, parSize: number = 10) {
    this.page = parPage;
    this.size = parSize;
  }

  /**
   * Elimina todos los parametros
   */
  public clearParameters(): boolean {
    try {
      this.paginateParametersList = [];
      return true;
    } catch (ex) {
      return false;
    }
  }

  /**
   * Elimina todos los orderFields
   */
  public clearOrderFields(): boolean {
    try {
      this.orderFieldsList = [];
      return true;
    } catch (ex) {
      return false;
    }
  }

  public addParameter(
    parFieldName: string,
    parValue: string,
    parOperation: string = '='
  ) {
    const parameter: PaginateParametersModel = new PaginateParametersModel(
      parFieldName,
      parValue,
      parOperation
    );
    //Busca el parametro, si es igual, lo reemplaza
    for (let par of this.paginateParametersList) {
      if (par.name === parFieldName) {
        par.operation = parOperation;
        par.value = parValue;
        return; //Existe
      }
    }

    //No existe: Agregar
    this.paginateParametersList.push(parameter);
  }

  public addOrderField(parFieldName: string, parOrderType: string = 'asc') {
    const orderField: PaginateOrderModel = new PaginateOrderModel(
      parFieldName,
      parOrderType
    );
    this.orderFieldsList.push(orderField);
  }
}
