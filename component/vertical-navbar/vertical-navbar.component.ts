import { Component, HostListener } from '@angular/core';
import { NavbarRoute } from '../../models/NavbarRoute';
import { config } from '../../../config';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { navbarList } from '../../../navbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vertical-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  providers: [],
  templateUrl: './vertical-navbar.component.html',
  styleUrl: './vertical-navbar.component.scss',
})
export class VerticalNavbarComponent {
  navbarList: NavbarRoute[] = [];
  config: any = config;

  isMobile: boolean = false; // Variable para detectar si la pantalla es pequeña (menor a 600px)
  filteredNavbarList: NavbarRoute[] = [];
  constructor(public authService: AuthService, private router: Router) {
    this.navbarList = navbarList;
    this.checkScreenSize();
  }
  checkScreenSize() {
    this.isMobile = window.innerWidth < 600;
    this.updateNavbarList();
  }
  updateNavbarList() {
    if (this.isMobile) {
      // Filtrar las rutas solo si la pantalla es menor a 600px
      this.filteredNavbarList = navbarList.filter(
        (route) => route.mobile == true
      );
      this.navbarList = this.filteredNavbarList;
    } else {
      // Si la pantalla es mayor o igual a 600px, mostrar todas las rutas
      this.filteredNavbarList = navbarList;
      this.navbarList = this.filteredNavbarList;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize(); // Verificar tamaño de pantalla cuando se redimensione la ventana
  }

  salir() {
    this.authService.logout();
  }
}
