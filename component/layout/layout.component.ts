import { Component } from '@angular/core';
import { SmLoadingComponent } from '../sm-loading/sm-loading.component';
import { Router, RouterOutlet } from '@angular/router';
import { VerticalNavbarComponent } from '../vertical-navbar/vertical-navbar.component';
import { config } from '../../../config';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.services';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    SmLoadingComponent,
    RouterOutlet,
    VerticalNavbarComponent,
    CommonModule,
    HttpClientModule
  ],
  providers: [AuthService, DataService, HttpClient],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  currentDate: Date = new Date();
  config: any = config;

  constructor(private router: Router) {
    // Verifica si el usuario está logueado
    /*    if (window.location.pathname !== 'public/login' && !user) {
      this.router.navigate(['public/login']); // Si no está logueado, redirige al login
    } */
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
