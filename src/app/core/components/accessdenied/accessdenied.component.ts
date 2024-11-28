import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'esa-accessdenied',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accessdenied.component.html',
  styleUrls: ['./accessdenied.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AccessDeniedComponent {}
