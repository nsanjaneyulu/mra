import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ImportsModule } from '../../../../shared/utils/imports';
import { CommonModule } from '@angular/common';
import { ReusableButtonComponent } from "../reusable-button/reusable-button.component";
import { Router } from '@angular/router';
@Component({
    selector: 'esa-reusable-table-collapse',
    standalone: true,
    templateUrl: './reusable-table-collapse.component.html',
    styleUrl: './reusable-table-collapse.component.scss',
    encapsulation: ViewEncapsulation.Emulated,
    imports: [CommonModule, ImportsModule, ReusableButtonComponent]
})
export class ReusableTableCollapseComponent {
  @Input() tableData: any[] = [];
  @Input() columns: any[] = [];
  @Input() selectionMode: any;
  @Input() showAction: boolean = true;
  @Input() showActionButton: boolean = true;
  @Input() showActionUpdate: boolean = false;
  @Input() rows: number = 10;
  @Input() rowsPerPageOptions: number[] = [10, 20, 30];
  @Output() rowSelected = new EventEmitter<any>();
  @Output() actionClicked = new EventEmitter<any>();

  selectedRow: any;
  filteredData: any[] = [];
  constructor(private router: Router) {}
  ngOnInit() {
    this.filteredData = [...this.tableData];
  }

  toggleRow(row: any) {
    this.selectedRow = this.selectedRow === row ? null : row;
    this.rowSelected.emit(this.selectedRow);
  }

  onActionClick(row: any) {
    if(this.showActionButton){
      this.router.navigate(['/mraoptions/news/create-news']);
    } else if(this.showActionButton)
    {
      this.router.navigate(['/mraoptions/news/create-news']);
    }
    else {

    }
    this.actionClicked.emit(row);
  }

  onSearch(event: any, field: string) {
    const value = event.target.value.toLowerCase();
    this.filteredData = this.tableData.filter(item => item[field].toLowerCase().includes(value));
  }
}
