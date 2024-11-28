import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnInit, OnChanges } from '@angular/core';
import { Table } from 'primeng/table';
import { ImportsModule } from '../../../../shared/utils/imports';
import { CommonModule } from '@angular/common';
import { ReusableButtonComponent } from "../reusable-button/reusable-button.component";
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
@Component({
    selector: 'esa-reusable-table',
    standalone: true,
    templateUrl: './reusable-table.component.html',
    styleUrl: './reusable-table.component.scss',
    encapsulation: ViewEncapsulation.Emulated,
    imports: [ImportsModule, InputGroupAddonModule, CommonModule, ReusableButtonComponent, InputGroupModule]
})
export class ReusableTableComponent implements OnInit, OnChanges {
  @Input() tableData: any[] = [];
  @Input() columns: any[] = [];
  @Input() rows: number = 10;
  @Input() rowsPerPageOptions: number[] = [10, 20, 30];
  @Input() showAction: boolean = false;
  @Input() showManageAccess: boolean = false;
  @Input() uploadSalesDashboardView: boolean = false;
  @Input() showActionDelete: boolean = false;
  @Output() reportAccessView = new EventEmitter<any>();
  @Output() uploadNewsletterView = new EventEmitter<any>();
  @Output() uploadSalesDispatchView = new EventEmitter<any>();
  @Output() uploadSalesDashboard = new EventEmitter<any>();
  constructor() {}
  ngOnInit() {
  }
  ngOnChanges() {
  }
  filterTable(event: Event, field: string, table: Table) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value || '';
    table.filter(value, field, 'contains');
  }
  onActionClick(rowData: any, actionType?: string) {
    let setRowData;
    if(actionType == 'view'){
      setRowData = { ...rowData, ...{"actionType": actionType} };
    }
    else if(actionType == 'delete') {
      setRowData = { ...rowData, ...{"actionType": actionType} };
    } else if(actionType == 'manageAccess') {
      setRowData = { ...rowData, ...{"actionType": actionType} };
      this.reportAccessView.emit(setRowData);
    } else {

    }
    this.uploadNewsletterView.emit(setRowData);
    this.uploadSalesDispatchView.emit(setRowData);
  }
  uploadSalesDashboardClick(rowData: any) {
    this.uploadSalesDashboard.emit(rowData);
  }
}
