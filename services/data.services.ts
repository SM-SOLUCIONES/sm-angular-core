import { HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoutesModel } from './../models/Routes.model';
import { env } from './../../env';
import { routes } from '../../routes';
import { HttpData } from '../models/HttpData.model';
import { AccessToken } from '../models/AccessToken.model';

@Injectable()
export class DataService {
  private retry: number = 0;
  private routes: { [key: string]: RoutesModel } = routes;
  public enviroments = env;

  constructor(private http: HttpClient) {}

  httpFunction(
    routeName: string,
    body?: any,
    parameters?: { [key: string]: string }
  ): Promise<HttpData> {
    return new Promise(async (resolve, reject) => {
      const route = routes[routeName];
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
        const accessToken: AccessToken | null = this.getToken();
        if (accessToken)
          headers = headers.append(
            'Authorization',
            `Bearer ${accessToken.accessToken}`
          );
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
          const res = new HttpData(this.getRouteName(route), route, data, null);
          resolve(res);
        },
        (error) => {
          const res = new HttpData(
            this.getRouteName(route),
            route,
            null,
            error
          );
          resolve(res);
        }
      );
    });
  }

  getRouteName(route: RoutesModel): string {
    const json = JSON.stringify(route);
    for (const name of Object.keys(this.routes)) {
      if (JSON.stringify(this.routes[name]) === json) {
        return name;
      }
    }
    return '';
  }

  getToken(): AccessToken | null {
    var string = localStorage.getItem('access_token');
    if (!string) return null;
    var json = JSON.parse(string);
    var accessToken: AccessToken = new AccessToken(json);
    return accessToken;
  }
}
