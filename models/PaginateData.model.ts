/**
 * Es un modelo para el Paginate del Spring boot.
 * Los datos se encuentran en Content.
 */
export class PaginateDataModel {
  public content: any[] = [];
  public empty: boolean = false;
  public first: boolean = true;
  public last: boolean = true;
  public number: number = 1;
  public numberOfElements: number = 0;
  public totalElements: number = 0;
}
