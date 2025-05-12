export class ConfigModel {
  nombre: string = '';
  empresa: string = '';
  urlEmpresa: string = '';
  dataService: DataServiceConfig = new DataServiceConfig();
}

class DataServiceConfig {
  enable: boolean = true;
  authService: AuthServiceConfig = new AuthServiceConfig();
}

class AuthServiceConfig {
  autoLogin: AutoLoginConfig = new AutoLoginConfig();
  serverRouteLogin: string = '';
  loginImg: string = '';
  loginRecuperarContrasenia: boolean = false;
  loginRegristrarse: boolean = false;
}

class AutoLoginConfig {
  enable: boolean = true;
  username: string = '';
  password: string = '';
}
