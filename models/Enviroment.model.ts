import { Sso } from './Sso.model';

export class EnviromentModel {
  server: string = '';
  consoleLog: boolean = false;
  sso: Sso = new Sso();
  otros?: { [key: string]: string } = {};
}
