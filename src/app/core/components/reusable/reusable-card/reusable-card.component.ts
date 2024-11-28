import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ImportsModule } from '../../../../shared/utils/imports';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'esa-reusable-card',
  standalone: true,
  imports: [CommonModule, ImportsModule],
  templateUrl: './reusable-card.component.html',
  styleUrl: './reusable-card.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class ReusableCardComponent {
  @Input() title: string = '';
  @Input() subTitle: string = '';
  @Input() showSubTitle: boolean = false;
  @Output() cardClick = new EventEmitter<void>();

  handleClick() {
    this.cardClick.emit();
  }
}
