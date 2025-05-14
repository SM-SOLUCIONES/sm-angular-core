import { Component, HostListener } from '@angular/core';
import { NavbarRoute } from '../../models/NavbarRoute';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { EnviromentService } from '../../services/enviroment.service';
import { ConfigModel } from '../../models/Config.model';

@Component({
  selector: 'app-vertical-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  providers: [],
  templateUrl: './vertical-navbar.component.html',
  styleUrl: './vertical-navbar.component.scss',
})
export class VerticalNavbarComponent {
  navbarList: NavbarRoute[] | undefined;
  config: ConfigModel | undefined;

  isMobile: boolean = false; // Variable para detectar si la pantalla es pequeña (menor a 600px)
  filteredNavbarList: NavbarRoute[] = [];
  constructor(
    public authService: AuthService,
    private router: Router,
    private enviromentService: EnviromentService
  ) {
    this.checkScreenSize();
    this.getEnv();
  }

  async getEnv() {
    this.config = await this.enviromentService.getConfig();
    if (!this.config)
      throw new Error('No se encontró el archivo de configuración');

    this.navbarList = await this.enviromentService.getNavbar();
    if (!this.navbarList)
      throw new Error('No se encontró el archivo de navbars');
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 600;
    this.updateNavbarList();
  }

  updateNavbarList() {
    if (!this.config)
      throw new Error('No se encontró el archivo de configuración');
    if (!this.navbarList)
      throw new Error('No se encontró el archivo de navbars');

    if (this.isMobile) {
      // Filtrar las rutas solo si la pantalla es menor a 600px
      this.filteredNavbarList = this.navbarList.filter(
        (route) => route.mobile == true
      );
      this.navbarList = this.filteredNavbarList;
    } else {
      // Si la pantalla es mayor o igual a 600px, mostrar todas las rutas
      this.filteredNavbarList = this.navbarList;
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
