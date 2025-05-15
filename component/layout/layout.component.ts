import { Component } from '@angular/core';
import { SmLoadingComponent } from '../sm-loading/sm-loading.component';
import { Router, RouterOutlet } from '@angular/router';
import { VerticalNavbarComponent } from '../vertical-navbar/vertical-navbar.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.services';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EnviromentService } from '../../services/enviroment.service';
import { ConfigModel } from '../../models/Config.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    SmLoadingComponent,
    RouterOutlet,
    VerticalNavbarComponent,
    CommonModule,
    HttpClientModule,
  ],
  providers: [AuthService, DataService, HttpClient],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  currentDate: Date = new Date();
  version: string | undefined;
  config: ConfigModel | undefined;

  constructor(
    private router: Router,
    private enviromentService: EnviromentService
  ) {
    this.getEnv();
  }

  async getEnv() {
    this.version = await this.enviromentService.getVersion();
    if (!this.version)
      throw new Error('No se encontró el archivo de version | getEnv');

    this.config = await this.enviromentService.getConfig();
    if (!this.config)
      throw new Error('No se encontró el archivo de configuración | getEnv');
  }

  formatearFecha(fecha: Date): string {
    // Obtener el día, mes y año
    let dia: number = fecha.getDate();
    let mes: number = fecha.getMonth() + 1; // Los meses en JavaScript son base 0, por lo que sumamos 1.
    let año: number = fecha.getFullYear();

    // Formatear la fecha como "dd/mm/yyyy"
    let fechaFormateada: string = `${dia < 10 ? '0' + dia : dia}/${
      mes < 10 ? '0' + mes : mes
    }/${año}`;

    return fechaFormateada;
  }
}
