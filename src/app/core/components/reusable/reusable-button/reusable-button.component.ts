import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ImportsModule } from '../../../../shared/utils/imports';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'esa-reusable-button',
  standalone: true,
  imports: [CommonModule, ImportsModule],
  templateUrl: './reusable-button.component.html',
  styleUrl: './reusable-button.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class ReusableButtonComponent {
  @Input() label: string = 'Button';
  @Input() backgroundColor: string = '#007bff';
  @Input() textColor: string = '#ffffff';
  @Input() icon: string = '';
  @Input() outlined: boolean = false;
  @Input() disabled: boolean = false;
  @Output() clickAction: EventEmitter<void> = new EventEmitter<void>();
  constructor() {
  }
  onClick() {
    if (!this.disabled) {
      this.clickAction.emit();
    }
  }
}
