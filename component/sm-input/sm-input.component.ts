import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
} from '@angular/forms';
import { DropdownPosition, NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'sm-input',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgSelectModule],
  templateUrl: './sm-input.component.html',
  styleUrl: './sm-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SmInputComponent),
      multi: true,
    },
  ],
})
export class SmInputComponent implements ControlValueAccessor {
  @Output() change = new EventEmitter<any>();
  @Output() search = new EventEmitter<any>();

  @Input() type: string = 'text'; // Puede ser 'text', 'number', 'date', 'select'...
  @Input() label: string = '';
  @Input() nameFormControl: string = '';
  @Input() style: string = 'formbasic';
  @Input() placeholder: string = '';
  @Input() form?: FormGroup;
  @Input() uppercase: boolean = false; // fuerza los iunputs a mayusculas

  // ngmodel
  @Input() value: any; // Value del ngmodel

  // select
  @Input() items: any[] = []; // Datos para el select
  @Input() bindLabel: string = ''; // Propiedad a mostrar en el select
  @Input() bindValue: string = ''; // Propiedad para el valor del select
  @Input() clearable: boolean = true; // Permite limpiar el select

  @Input() appendTo: string = 'body';
  @Input() dropdownPosition: DropdownPosition = 'bottom';

  disabled: boolean = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.value) {
      this.writeValue(this.value);
    }

    if (this.uppercase) {
      this.style += ' uppercase';
    }

    for (const item of this.items) {
      if (!Object.keys(item).includes(this.bindValue)) {
        console.error(`El bindValue "${this.bindValue}" no existe`);
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.value = value;
      this.onChange(value);
    }
  }

  compareWith = (item1: any, item2: any): boolean => {
    return item1 && item2 ? item1 === item2 : item1 === item2;
  };

  onInputChange(event: any): void {
    // console.log('Evento change detectado:', event);
    // this.value = event;
    this.cd.detectChanges();
    this.change.emit(event);
  }

  async searchOnChange(term: string) {
    return new Promise((resolve) => {
      this.search.emit({ term, resolve });
    });
  }
}
