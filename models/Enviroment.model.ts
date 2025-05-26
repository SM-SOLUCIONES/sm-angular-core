import { Sso } from './Sso.model';

export class EnviromentModel {
  server: string = '';
  otros?: { [key: string]: string } = {};
  consoleLog: boolean = false;
  sso: Sso = new Sso();
}
