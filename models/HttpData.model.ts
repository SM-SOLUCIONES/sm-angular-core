import { RoutesModel } from './Routes.model';

export class HttpData {
  public name: string;
  public route: RoutesModel;
  public err: any;
  public data: any;

  constructor(name: string, route: RoutesModel, data: any, err: any = null) {
    this.name = name;
    this.route = route;
    this.data = data;
    this.err = err;
  }
}
