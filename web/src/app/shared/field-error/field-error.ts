import { Component, computed, input } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';

@Component({
  imports: [],
  selector: 'app-field-error',
  styleUrl: './field-error.scss',
  templateUrl: './field-error.html',
})
export class FieldError {
  readonly field = input.required<FieldTree<unknown>>();

  protected readonly state = computed(() => this.field()());
}
