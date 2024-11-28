import { Component, Output, EventEmitter, Input, ViewEncapsulation} from '@angular/core';
import { ImportsModule } from '../../../../shared/utils/imports';
import { CommonModule } from '@angular/common';
import { ReusableButtonComponent } from "../reusable-button/reusable-button.component";
@Component({
    selector: 'esa-reusable-search-filter',
    standalone: true,
    templateUrl: './reusable-search-filter.component.html',
    styleUrl: './reusable-search-filter.component.scss',
    encapsulation: ViewEncapsulation.Emulated,
    imports: [CommonModule, ImportsModule, ReusableButtonComponent]
})
export class ReusableSearchFilterComponent {
  today: Date = new Date();
  @Input() fields: any[] = [];
  @Output() search = new EventEmitter<any>();

  filters: any = {};
  constructor() {}
  ngOnInit() {
    // Initialize filters object with field names
    this.fields.forEach(field => {
      this.filters[field.name] = '';
    });
  }

  onSearch() {
    this.search.emit(this.filters);
  }

  clearFilters() {
    this.fields.forEach(field => {
      this.filters[field.name] = '';
    });
    this.onSearch();
  }
}
