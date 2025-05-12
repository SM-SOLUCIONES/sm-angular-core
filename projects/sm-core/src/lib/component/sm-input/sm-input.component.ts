import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sm-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sm-input.component.html',
  styleUrl: './sm-input.component.scss',
})
export class SmInputComponent {
  @Input() type: string = 'text';
  @Input() labelValue: string = 'NombreLabel';
  @Input() nameFormControl: string = '';
  @Input() style: string = 'formbasic';
  @Input() form: FormGroup;
  constructor() {
    this.form = new FormGroup({});
  }
}
