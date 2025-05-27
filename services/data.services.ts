import { HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoutesModel } from './../models/Routes.model';
import { HttpData } from '../models/HttpData.model';
import { AccessToken } from '../models/AccessToken.model';
import { EnviromentService } from './enviroment.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private retry: number = 0;

  constructor(
    private http: HttpClient,
    private enviromentService: EnviromentService,
    private router: Router
  ) {}

  httpFunction(
    routeName: string | RoutesModel,
    body?: any,
    parameters?: { [key: string]: string }
  ): Promise<HttpData> {
    return new Promise(async (resolve, reject) => {
      const routes = await this.enviromentService.getRoutes();
      if (!routes) throw new Error('No se encontraron las rutas');
      const env = await this.enviromentService.getEnv();
      if (!env) throw new Error('No se encontró el env');
      const config = await this.enviromentService.getConfig();
      if (!config) throw new Error('No se encontró el config');

      var route: RoutesModel;
      if (typeof routeName == 'string') {
        route = routes[routeName];
      } else {
        route = routeName;
      }

      let url = env.server + route.url;

      // Reemplazar los parámetros en la URL si existen
      if (parameters)
        for (const key in parameters) {
          url = url.replace(`%${key}%`, parameters[key]);
        }

      // Configuración de los encabezados HTTP
      let headers: HttpHeaders = new HttpHeaders();
      let defaultHead: boolean = true;
      if (route.headers)
        for (const head of route.headers) {
          headers = headers.append(head[0], head[1]);
          if (head[0] === 'Content-Type') defaultHead = false;
        }
      if (defaultHead)
        headers = headers.append('Content-Type', 'application/json');

      if (!route.noAuth) {
        if (
          config.authService.type == 'jwt' ||
          config.authService.type == 'sso'
        ) {
          const accessToken: AccessToken | null = this.getToken();
          if (accessToken)
            headers = headers.append(
              'Authorization',
              `Bearer ${accessToken.accessToken}`
            );
        } else if (config.authService.type == 'basic') {
          const basic = this.getBasic();
          // TODO se agrega como header
        }
      }

      // Crear la variable observable dependiendo de la operación HTTP
      let observable: Observable<{}>;

      switch (route.httpOperation) {
        case 'post':
          observable = this.http
            .post(url, body || {}, { headers })
            .pipe(retry(this.retry));
          break;
        case 'put':
          observable = this.http
            .put(url, body || {}, { headers })
            .pipe(retry(this.retry));
          break;
        case 'get':
          observable = this.http.get(url, { headers }).pipe(retry(this.retry));
          break;
        case 'delete':
          observable = this.http
            .delete(url, { headers })
            .pipe(retry(this.retry));
          break;
        default:
          throw new Error(`Metodo HTTP no soportado: ${route.httpOperation}`);
      }

      // Suscripción al observable
      observable.subscribe(
        (data) => {
          const res = new HttpData(
            this.getRouteName(route, routes),
            route,
            data,
            null
          );
          resolve(res);
        },
        (error) => {
          const res = new HttpData(
            this.getRouteName(route, routes),
            route,
            null,
            error
          );
          if (error.status === 403) {
            this.redirectToLogin()
          }
          resolve(res);
        }
      );
    });
  }

  getRouteName(
    route: RoutesModel,
    routes: { [key: string]: RoutesModel }
  ): string {
    const json = JSON.stringify(route);
    for (const name of Object.keys(routes)) {
      if (JSON.stringify(routes[name]) === json) {
        return name;
      }
    }
    return '';
  }

  getToken(): AccessToken | null {
    var string = localStorage.getItem('access');
    if (!string) return null;
    var json = JSON.parse(string);
    var accessToken: AccessToken = new AccessToken(json);
    return accessToken;
  }

  getBasic(): string {
    // TODO: se obtiene del local storage los datos del basic auth
    return '';
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
      console.log('url actual', this.router.url);
      if (this.router.url !== config.authService.serverRouteLogin) {
        // this.router.navigate([config.authService.serverRouteLogin]);
      }
    } else if (config.authService.type == 'sso') {
      window.location.href =
        env.sso.url + '?redirect=' + btoa(env.sso.redirectUri);
    }
  }
}
