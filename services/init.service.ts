import { Injectable } from '@angular/core';
import { EnviromentModel } from '../models/Enviroment.model';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  public env: EnviromentModel | undefined;

  setEnviroment(env: EnviromentModel) {
    this.env = env;
  }
}
