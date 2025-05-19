import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableHeader } from '../../models/TableHeader.model';
import { TableAction } from '../../models/TableAction.model';

@Component({
  selector: 'sm-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sm-table.component.html',
  styleUrl: './sm-table.component.scss',
})
export class SmTableComponent implements OnInit {
  @Input() dataHeader: TableHeader[] = [
    { key: 'nombre', name: 'Nombre' },
    { key: 'apellido', name: 'Apellido' },
    // { key: 'documentoPertenencia', name: 'Pertenencia' },
    // Puedes agregar más campos aquí con la relación key:name
  ];
  @Input() dataBody: any[] = [];
  @Input() dataActions: TableAction[] = [];

  ngOnInit(): void {}

  parseData(row: any, header: TableHeader) {
    if (row[header.key] === 0 && typeof row[header.key] === 'number') {
      return '0';
    }
    if (!row[header.key]) {
      return '-';
    }
    var value = row[header.key];
    if (header.func) {
      value = header.func(value);
    }
    return value;
  }

  clickAction(action: TableAction) {
    action.func("asd")
  }
}
