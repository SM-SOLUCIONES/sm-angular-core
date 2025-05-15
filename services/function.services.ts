import { Injectable } from '@angular/core';
import { formatCurrency, registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { cloneDeep } from 'lodash';

registerLocaleData(localeEsAr);

@Injectable({
  providedIn: 'root'
})
export class FunctionService {
  public yesNoLst: any = [
    { nombre: 'No', id: 0 },
    { nombre: 'Si', id: 1 },
  ];

  public diasSemana: string[] = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  /**
   * Realiza una copia completa del object
   * @param originalObject Objeto original a hacer la copa
   * @returns un nuevo object a partir del objeto pasado
   */
  public cloneDeepObject(originalObject: any): any {
    try {
      return cloneDeep(originalObject);
    } catch (ex) {
      console.error('cloneDeepObject', ex);
      return undefined;
    }
  }
  /**
   * Retorna el Valor de un Number, si es NaN o invalido retorna el parDefault
   * @param value
   * @param parDefault
   * @returns
   */
  getNumber(value: any, parDefault: number): number {
    try {
      if (isNaN(value) || value == null || value == undefined) {
        return 0;
      } else {
        return Number(value);
      }
    } catch (ex) {
      return parDefault;
    }
  }

  getStr(value: any): string {
    try {
      if (value == undefined || value == null || !value) {
        return '';
      } else {
        return String(value);
      }
    } catch (ex) {
      return '';
    }
  }
  public getValueFromObject(object: any, path: string) {
    let defaultValue: string = '';
    let properties: string[] = path.split('.');

    if (properties.length <= 1) {
      if (object.hasOwnProperty(path)) {
        return object[path];
      } else {
        return defaultValue;
      }
    } else {
      let obj = object;
      for (var i = 0; i < properties.length; i++) {
        let prop = properties[i];
        if (obj.hasOwnProperty(prop)) {
          obj = obj[prop];
          if (i === properties.length - 1) {
            return obj;
          }
        } else {
          return defaultValue;
        }
      }
    }
  }

  /**
   * Permite el copiado de objetos campo por campo
   * busca todos los campos que esten en el destino y los copia desde la fuente
   * NO COPIA ELEMENTOS ANIDADOS
   * @param destino es el objeto (destino) de la copia
   * @param fuente es el objeto que tiene los datos
   * @returns
   */
  public copyValuesObject(destino: any, fuente: any): any {
    for (let key of Object.keys(destino)) {
      this.setValueFromObject(
        destino,
        key,
        this.getValueFromObject(fuente, key)
      );
    }
    return destino;
  }

  public setValueFromObject(object: any, path: string, value: any) {
    let properties: string[] = path.split('.');

    if (properties.length <= 1) {
      if (object.hasOwnProperty(path)) {
        object[path] = value;
      }
    } else {
      let obj = object;
      for (var i = 0; i < properties.length; i++) {
        let prop = properties[i];
        if (obj.hasOwnProperty(prop)) {
          if (i === properties.length - 1) {
            obj[prop] = value;
          } else {
            obj = obj[prop];
          }
        }
      }
    }
  }

  public yesNo(value: number): string {
    if (value == 1) {
      return 'Si';
    } else {
      return 'No';
    }
  }
  public formatMoney(value: number, moneySymbol?: string): string {
    let str = formatCurrency(value, 'es-AR', '$');
    if (moneySymbol) {
      str = str.replace('$', moneySymbol);
    }
    return str;
  }

  public formatNumber(value: any): string {
    let valuePass: number = 0;
    if (value != undefined && value != null && Number.isNaN(value) == false) {
      valuePass = value;
    }

    return formatCurrency(valuePass, 'en-US', '$');
  }

  /**
   * Devuelve un numero con la cantidad de digitos expresados y ceros rellenados.
   * @param num Numero
   * @param size Cantidad de Digitos que debe tener, rellena con 0 para llegar
   */
  fillZeroNumber(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  }

  //Recordar que algunas funciones de angular y java el mes empieza en cero.
  public getLastDayOfMonth(year: number, month: number): number {
    if (month == 12) {
      return 31;
    }

    let dateOld: any = new Date(year, month, 1);
    return new Date(dateOld - 1).getDate();
  }

  public getDayOfWeek(date: Date): string {
    return this.getDayOfWeekFromIndex(date.getDay());
  }

  // Comienza desde 1
  public getDayOfWeekFromIndex(day: number): string {
    if (day == 0) {
      return 'Domingo';
    } else {
      return this.diasSemana[day - 1];
    }
  }

  public getMonths(): string[] {
    return [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
  }

  public getMonthsId(): any[] {
    return [
      { id: 0, name: 'Enero' },
      { id: 1, name: 'Febrero' },
      { id: 2, name: 'Marzo' },
      { id: 3, name: 'Abril' },
      { id: 4, name: 'Mayo' },
      { id: 5, name: 'Junio' },
      { id: 6, name: 'Julio' },
      { id: 7, name: 'Agosto' },
      { id: 8, name: 'Septiembre' },
      { id: 9, name: 'Octubre' },
      { id: 10, name: 'Noviembre' },
      { id: 11, name: 'Diciembre' },
    ];
  }

  //De un string obtiene un date, el separador = /
  //Los meses empiezan desde cero en algunas funciones de Ang y Java
  /**
   * Obtiene un tipo de Objeto Date de un String.
   * @param dateString Es el formato del string:
   * @param sep Es el separador del string
   * @param formatType Indica de que tipo viene el formato origen: (0-Y/M/D | 1-D/M/Y)
   * @param includeTime Indica si el origen viene con la hora
   * @param sepHour El separador de hora
   * @returns Objeto del Tipo Date
   */
  public getDateFromString(
    dateString: string,
    sep: string,
    formatType: number = 0,
    includeTime: boolean = false,
    sepHour: string = ' '
  ): Date | null | undefined {
    let timeString: string = '';
    let tokHourMinuteSecond: string[] = [];

    let year: number = 0;
    let month: number = 0;
    let day: number = 0;
    let hour: number = 0;
    let minute: number = 0;
    let second: number = 0;
    if (dateString == '') {
      return null;
    }
    let tokens = dateString.split(sep);
    if (tokens[2].indexOf(sepHour) > 0) {
      timeString = tokens[2].substring(tokens[2].indexOf(sepHour) + 1);
      tokens[2] = tokens[2].substring(0, tokens[2].indexOf(sepHour));
      tokHourMinuteSecond = timeString.split(':');
      hour = Number.parseInt(tokHourMinuteSecond[0]);
      minute = Number.parseInt(tokHourMinuteSecond[1]);
      second = Number.parseInt(tokHourMinuteSecond[2]);
    }

    switch (formatType) {
      case 0: //YEAR*MONTH*DAY
        year = Number.parseInt(tokens[0]);
        month = Number.parseInt(tokens[1]);
        day = Number.parseInt(tokens[2]);
        break;
      case 1: //day*month*date dejar igual
        day = Number.parseInt(tokens[0]);
        month = Number.parseInt(tokens[1]);
        year = Number.parseInt(tokens[2]);
        break;
    }
    if (includeTime == true) {
      return new Date(year, month - 1, day, hour, minute, second);
    } else {
      return new Date(year, month - 1, day);
    }
  }

  //   17/7/2023 22:13:56
  formatDateTime(date: any, pais: string = 'AR'): string {
    date = new Date(date);
    var day = (date.getDate() + '').padStart(2, '0');
    var month = (date.getMonth() + 1 + '').padStart(2, '0');
    var year = date.getFullYear();
    switch (pais) {
      case 'US':
        return `${day}/${month}/${year} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      case 'AR':
      default:
        return `${day}/${month}/${year} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
  }

  //   17/7/2023
  formatDate(date: any, pais: string = 'AR'): string {
    date = new Date(date);
    var day = (date.getDate() + '').padStart(2, '0');
    var month = (date.getMonth() + 1 + '').padStart(2, '0');
    var year = date.getFullYear();
    switch (pais) {
      case '8601':
        return `${year}-${month}-${day}`;
      case 'US':
        return `${day}/${month}/${year}`;
      case 'AR':
      default:
        return `${day}/${month}/${year}`;
    }
  }
}
