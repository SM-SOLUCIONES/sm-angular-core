import { Injectable } from '@angular/core';
import { DataService } from './data.services';
import { HttpData } from '../models/HttpData.model';
import { Router } from '@angular/router';
import { AccessToken } from '../models/AccessToken.model';
import Swal from 'sweetalert2';
import { AlertService } from './alert.service';
import { EnviromentService } from './enviroment.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: any | undefined;
  public awaitUser: boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private alertService: AlertService,
    private enviromentService: EnviromentService
  ) {
    this.getUser();
  }

  async login(user: string, pass: string) {
    const config = await this.enviromentService.getConfig();
    if (!config) throw new Error('No se encontró el config');

    if (config.authService.type != 'jwt') {
      console.error(
        'Se llama a login, pero el programa no esta configurado como jwt'
      );
      return;
    }

    try {
      const loginRes: HttpData = await this.dataService.httpFunction(
        'AUTH_LOGIN',
        { username: user, password: pass }
      );

      // Si el login es exitoso y los datos son correctos
      if (loginRes.data) {
        localStorage.setItem('access', JSON.stringify(loginRes.data));
        this.getUser();
        return true;
      } else {
        this.alertService.httpAlertError(loginRes, 'Ingreso invalido');
        return false;
      }
    } catch (error: any) {
      console.error('Catch login', error);
      Swal.fire({
        icon: 'error',
        title: `Error al comunicarse con el servidor`,
        text: error || '',
      });
    }
    return false;
  }

  async getUser(): Promise<any | undefined> {
    const config = await this.enviromentService.getConfig();
    if (!config) throw new Error('No se encontró el config');

    if (config.authService.type == 'jwt') {
      if (!this.getToken()) return;

      const usuaioRes: HttpData = await this.dataService.httpFunction(
        'USUARIO_ACTUAL'
      );

      if (usuaioRes.data) {
        this.user = usuaioRes.data;
        this.awaitUser = true;
        return this.user;
      } else {
        console.error('Error usuario actual', usuaioRes.err);
        this.awaitUser = true;
        return;
      }
    } else if (config.authService.type == 'sso') {
      var data: HttpData = await this.dataService.httpFunction('AUTH_ACTUAL');
      if (data.data) {
        this.user = data.data;
      } else {
        console.log('Error AUTH_ACTUAL', data);
        if (!this.router.url.includes('access')) {
          this.redirectToLogin();
        }
      }

      this.awaitUser = true;
    }
  }

  public async redirectToLogin() {
    const env = await this.enviromentService.getEnv();
    if (!env) throw new Error('No se encontró el env');
    const config = await this.enviromentService.getConfig();
    if (!config) throw new Error('No se encontró el config');

    if (
      config.authService.type == 'jwt' ||
      config.authService.type == 'basic'
    ) {
      console.log("url actual", this.router.url);
      if (this.router.url !== config.authService.serverRouteLogin) {
        this.router.navigate([config.authService.serverRouteLogin]);
      }
    } else if (config.authService.type == 'sso') {
      window.location.href =
        env.sso.url + '?redirect=' + btoa(env.sso.redirectUri);
    }
  }

  validRol(roles: string | string[]): boolean {
    if (!this.user) return false;
    var rolesUsuario: string[] = [];
    if ('permisos' in this.user) {
      rolesUsuario == this.user.permisos;
    } else if ('roles' in this.user) {
      rolesUsuario == this.user.roles;
    }

    if (Array.isArray(roles)) {
      for (const rol of roles) {
        if (rolesUsuario.includes(rol)) return true;
      }
      return false;
    } else {
      return rolesUsuario.includes(roles);
    }
  }

  async validRolAwait(roles: string | string[]): Promise<boolean> {
    await this.esperarUser();
    return this.validRol(roles);
  }

  getToken(): AccessToken | null {
    var string = localStorage.getItem('access');
    if (!string) return null;
    var json = JSON.parse(string);
    var accessToken: AccessToken = new AccessToken(json);
    return accessToken;
  }

  async logout() {
    const config = await this.enviromentService.getConfig();
    if (!config) throw new Error('No se encontró el config');

    localStorage.removeItem('access');
    this.redirectToLogin();
  }

  // isValidToken(token: string): Observable<boolean> {
  //   return from(
  //     this.dataService.httpFunction('IS_VALID_TOKEN', { token: token })
  //   ).pipe(
  //     map((res: HttpData) => !!res.data), // Si res.data existe => true
  //     catchError(() => of(false)) // Si hay error => false
  //   );
  // }

  public async setAccess(access: string) {
    const config = await this.enviromentService.getConfig();
    if (!config) throw new Error('No se encontró el config');
    if (config.authService.type != 'sso') {
      console.error('se llama a setAccess sin estan configurado como sso');
      return;
    }

    var string;
    try {
      string = atob(access);
      if (!string) {
        Swal.fire({
          icon: 'error',
          title: 'Los access desencodeados no tienen informacion',
        });
        return;
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'No se pueden desencodear los access',
      });
      return;
    }
    var json;
    try {
      json = JSON.parse(string);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo converir a json el access',
      });
      return;
    }
    try {
      if (!json.accessToken) {
        Swal.fire({
          icon: 'error',
          title: 'No existe accessToken en json',
        });
        return;
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'No se puedo leer accessToken en json',
      });
      return;
    }
    localStorage.setItem('access', string);
    return;
  }

  public async esperarUser(): Promise<boolean> {
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        if (this.awaitUser) {
          clearInterval(intervalId);
          resolve(true);
        }
      }, 100);
    });
  }
}
