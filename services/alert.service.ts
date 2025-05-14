import { Injectable } from '@angular/core';
import { HttpData } from '../models/HttpData.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  dataError(nombre: string, data: HttpData) {
    try {
      Swal.fire({
        icon: 'error',
        title: 'Error al obtener: ' + nombre,
        text: data.err.error.message,
      });
      return;
    } catch (error) {}

    try {
      Swal.fire({
        icon: 'error',
        title: 'Error al obtener: ' + nombre,
        text: data.err.message,
      });
      return;
    } catch (error) {}

    try {
      Swal.fire({
        icon: 'error',
        title: 'Error al obtener ' + nombre,
        text: data.err,
      });
      return;
    } catch (error) {}
  }
}
