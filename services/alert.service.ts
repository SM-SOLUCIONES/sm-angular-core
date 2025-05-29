import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpData } from '../models/HttpData.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  httpAlertError(data: HttpData, mensajeTitulo: string) {
    if (data.data) return;
    var mensaje = '';

    try {
      if (data.err.error.message) mensaje = data.err.error.message;
    } catch (e) {}

    try {
      if (!mensaje && data.err.message) mensaje = data.err.message;
    } catch (e) {}

    try {
      if (!mensaje && data.err) mensaje = data.err;
    } catch (e) {}

    if (!mensaje) mensaje = 'Error desconocido';

    try {
      Swal.fire({
        icon: 'error',
        title: mensajeTitulo,
        text: mensaje,
      });
      return;
    } catch (error) {
      console.error('Error al mostrar mensaje de error', error);
    }
  }

  throwHttpError(data: HttpData, mensaje: string) {
    if (data.data) return;
    this.httpAlertError(data, mensaje);
    throw data.err;
  }

  success(title: string, text: string = ''): Promise<any> {
    return Swal.fire({
      icon: 'success',
      title: title,
      text: text,
    });
  }

  error(title: string, text: string = ''): Promise<any> {
    return Swal.fire({
      icon: 'error',
      title: title,
      text: text,
    });
  }
}
