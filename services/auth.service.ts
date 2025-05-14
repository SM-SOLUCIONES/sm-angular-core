import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { env } from '../../env';
import { DataService } from './data.services';
import { HttpData } from '../models/HttpData.model';
import { catchError, from, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AccessToken } from '../models/AccessToken.model';
import Swal from 'sweetalert2';
import { AlertService } from './alert.service';

@Injectable()
export class AuthService {
  public user: User | undefined;
  public enviroments = env;
  public awaitUser: boolean = false;
  constructor(
    private dataService: DataService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.getUsuarioActual();
  }

  async login(user: string, pass: string) {
    try {
      const loginRes: HttpData = await this.dataService.httpFunction(
        'AUTH_LOGIN',
        { username: user, password: pass }
      );

      // Si el login es exitoso y los datos son correctos
      if (loginRes.data) {
        localStorage.setItem('access_token', JSON.stringify(loginRes.data));
        this.getUsuarioActual();
        return true;
      } else {
        this.alertService.dataError('usuario', loginRes);
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

  async getUsuarioActual(): Promise<User | undefined> {
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
  }

  validRol(roles: string | string[]): boolean {
    if (!this.user) return false;

    if (Array.isArray(roles)) {
      for (const rol of roles) {
        if (this.user.permisos.includes(rol)) return true;
      }
      return false;
    } else {
      return this.user.permisos.includes(roles);
    }
  }

  async validRolAwait(roles: string | string[]): Promise<boolean> {
    await this.esperarUser();
    return this.validRol(roles);
  }

  getToken(): AccessToken | null {
    var string = localStorage.getItem('access_token');
    if (!string) return null;
    var json = JSON.parse(string);
    var accessToken: AccessToken = new AccessToken(json);
    return accessToken;
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/public/login']);
  }

  isValidToken(token: string): Observable<boolean> {
    return from(
      this.dataService.httpFunction('IS_VALID_TOKEN', { token: token })
    ).pipe(
      map((res: HttpData) => !!res.data), // Si res.data existe => true
      catchError(() => of(false)) // Si hay error => false
    );
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
