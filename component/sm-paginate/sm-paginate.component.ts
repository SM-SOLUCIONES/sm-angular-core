import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectComponent } from '@ng-select/ng-select';
import { PaginateConfigModel } from '../../models/PaginateConfig.model';
import { FunctionService } from '../../services/function.services';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sm-paginate',
  standalone: true,
  imports: [NgbPaginationModule, NgSelectComponent, FormsModule, CommonModule],
  providers: [FunctionService],
  templateUrl: './sm-paginate.component.html',
  styleUrl: './sm-paginate.component.scss',
})
export class SmPaginateComponent {
  @Input() paginate: PaginateConfigModel = new PaginateConfigModel();
  @Output() setPageEvent: EventEmitter<any> = new EventEmitter();
  itemsSize: any[] = [{ size: 10 }, { size: 50 }, { size: 100 }, { size: 250 }];
  constructor(
    private cd: ChangeDetectorRef,
    public router: Router,
    private functionService: FunctionService
  ) {}
  getItemsPaginasSizes(): { size: number }[] {
    var items: { size: number }[] = [];
    this.paginate.itemsPaginasSizes.forEach((size) =>
      items.push({ size: size })
    );
    return items;
  }

  setPage(page: number) {
    this.paginate.page = page;
    this.setPageEvent.emit({
      page: this.functionService.getNumber(this.paginate.page, 0),
      size: this.functionService.getNumber(this.paginate.size, 10),
    });
  }

  setSize(event: any) {
    this.setPageEvent.emit({
      page: this.functionService.getNumber(this.paginate.page, 0),
      size: this.functionService.getNumber(this.paginate.size, 10),
    });
  }
}
