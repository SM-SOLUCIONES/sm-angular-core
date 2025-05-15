import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private esperasGlobales: string[] = [];
  private esperasLocales: string[] = [];

  comprobarGlobal(): boolean {
    if (this.esperasGlobales.length) return true;
    else return false;
  }

  comprobarLocal(nombre: string): boolean {
    for (const e of this.esperasLocales) {
      if (e == nombre) return true;
    }
    return false;
  }

  mostrar(nombre: string, global: boolean = true): void {
    if (global) {
      for (const e of this.esperasGlobales) {
        if (e == nombre) return;
      }
      this.esperasGlobales.push(nombre);
    } else {
      for (const e of this.esperasLocales) {
        if (e == nombre) return;
      }
      this.esperasLocales.push(nombre);
    }
  }

  ocultar(nombre: string): void {
    const indiceGlobal = this.esperasGlobales.indexOf(nombre);
    const indiceLocal = this.esperasGlobales.indexOf(nombre);
    if (indiceGlobal !== -1) this.esperasGlobales.splice(indiceGlobal, 1);
    if (indiceLocal !== -1) this.esperasLocales.splice(indiceLocal, 1);
  }
}
