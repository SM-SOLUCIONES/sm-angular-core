import { Injectable } from '@angular/core';
import { EnviromentModel } from '../models/Enviroment.model';
import Swal from 'sweetalert2';
import { RoutesModel } from '../models/Routes.model';
import { NavbarRoute } from '../models/NavbarRoute';
import { ConfigModel } from '../models/Config.model';

@Injectable({
  providedIn: 'root'
})
export class EnviromentService {
  private env: EnviromentModel | undefined;
  private routes: { [key: string]: RoutesModel } | undefined;
  private navbar: NavbarRoute[] | undefined;
  private config: ConfigModel | undefined;
  private version: string | undefined;

  setEnviroment(
    env: EnviromentModel,
    routes: { [key: string]: RoutesModel },
    navbar: NavbarRoute[],
    config: ConfigModel,
    version: string,
  ) {
    this.env = env;
    this.routes = routes;
    this.navbar = navbar;
    this.config = config;
    this.version = version;
  }

  async getEnv(): Promise<EnviromentModel | undefined> {
    return this.getVar(this.env, 'env');
  }

  async getRoutes(): Promise<{ [key: string]: RoutesModel } | undefined> {
    return this.getVar(this.routes, 'routes');
  }

  async getNavbar(): Promise<NavbarRoute[] | undefined> {
    return this.getVar(this.navbar, 'navbar');
  }

  async getConfig(): Promise<ConfigModel | undefined> {
    return this.getVar(this.config, 'config');
  }

  async getVersion(): Promise<string | undefined> {
    return this.getVar(this.version, 'version');
  }

  async getVar(data: any, nombre: string): Promise<any> {
    const startTime = Date.now();
    const timeout = 10000;

    while (data === undefined) {
      if (Date.now() - startTime >= timeout) {
        await Swal.fire({
          icon: 'error',
          title: 'Error al obtener el ' + nombre,
          text: 'Contacte con el administrador',
        });
        return undefined;
      }

      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    return data;
  }
}
