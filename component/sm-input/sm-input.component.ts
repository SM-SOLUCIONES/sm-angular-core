import { Component, Input, forwardRef } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

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
  @Input() type: string = 'text';
  @Input() label: string = 'texto';
  @Input() nameFormControl: string = '';
  @Input() style: string = 'formbasic';
  @Input() placeholder: string = '';
  @Input() form?: FormGroup;
  @Input() disabled: boolean = false; // Solo para cuando no se usa formulario
  @Input() items: any[] = []; // Datos para el select
  @Input() bindLabel: string = 'label'; // Propiedad a mostrar en el select
  @Input() bindValue: string = 'value'; // Propiedad para el valor del select
  @Input() value: string = 'value'; // Propiedad de valor para el select sin formulario

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor() {}

  writeValue(value: any): void {
    this.value = value;
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

  onInputChange(event: any): void {
    this.value = event.target.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
