import { Component, Input } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'sm-loading',
  imports: [CommonModule],
  templateUrl: './sm-loading.component.html',
  styleUrls: ['./sm-loading.component.scss'],
})
export class SmLoadingComponent {
  @Input() localName: string = 'global'; // Si es "global" si usa para validar todas las variables globales

  constructor(public loadingService: LoadingService) {}

  comprobarEstado(): boolean {
    if (this.localName == 'global') {
      return this.loadingService.comprobarGlobal();
    } else {
      return this.loadingService.comprobarLocal(this.localName);
    }
  }
}
