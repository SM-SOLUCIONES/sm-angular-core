import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  estado: boolean = false

  mostrar() {
    this.estado = true;
  }

  ocultar() {
    this.estado = false;
  }
}
