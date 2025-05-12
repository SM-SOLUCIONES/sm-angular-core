/**
 * Es un modelo para enviar a un recurso con paginate
 *
 */
export class PaginateOrderModel {
  public fieldName: string = "";
  public orderType: string = "=";

  constructor(parFieldName: string, parOrderType: string) {
    if (parOrderType.trim() === "") {
      parOrderType = "asc";
    }

    this.fieldName = parFieldName;
    this.orderType = parOrderType;
  }
}
