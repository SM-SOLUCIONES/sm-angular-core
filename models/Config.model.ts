export class ConfigModel {
  nombre: string = '';
  nombreNavbar?: boolean = true;
  empresa: string = '';
  urlEmpresa: string = '';
  authService: AuthServiceConfig = new AuthServiceConfig();
}

class AuthServiceConfig {
  type: 'none' | 'basic' | 'jwt' | 'sso' = 'none';
  serverRouteLogin?: string = '';
  loginImg?: string = '';
  loginRecuperarContrasenia?: boolean = false;
  loginRegristrarse?: boolean = false;
}

