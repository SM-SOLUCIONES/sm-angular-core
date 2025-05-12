/**
 * Es un modelo para enviar a un recurso con paginate
 *
 */
export class PaginateParametersModel {
  public name: string = "";
  public operation: string = "=";
  public value: string = "";
/*   public fieldType: string = "string";
 */
  constructor(
    parName: string,
    parValue: string,
    parOperation: string,
/*     parFieldType?: string
 */  ) {
    if (parOperation.trim() === "") {
      parOperation = "=";
    }/* 
    if (parFieldType == undefined) {
      parFieldType = "string";
    } */
    this.name = parName;
    this.operation = parOperation;
    this.value = parValue;
/*     this.fieldType = parFieldType;
 */  }
}
