import { Component, ViewEncapsulation } from '@angular/core';
import { ReusableSearchFilterComponent } from "../../../core/components/reusable/reusable-search-filter/reusable-search-filter.component";
import { reportAccessSeachConfig, reportAccessTableConfig, reportAccessColumnsConfig, reportAccessManageConfig} from './report-accessDto';
import { ReportAccessService } from './report-access.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { ImportsModule } from '../../../shared/utils/imports';
import { ReusableTableComponent } from "../../../core/components/reusable/reusable-table/reusable-table.component";
import { ReusableButtonComponent } from "../../../core/components/reusable/reusable-button/reusable-button.component";
@Component({
    selector: 'esa-report-access',
    standalone: true,
    templateUrl: './report-access.component.html',
    styleUrl: './report-access.component.scss',
    encapsulation: ViewEncapsulation.Emulated,
    imports: [ImportsModule, ReusableSearchFilterComponent, ReusableTableComponent, ReusableButtonComponent]
})
export class ReportAccessComponent {
  fields = reportAccessSeachConfig;
  reportAccessData: any[] = [];
  filteredData : any;
  pageSize: number = 10;
  rowsPerPageOptions: number[] = [10, 20, 30];
  columns = reportAccessColumnsConfig;
  showAction: boolean = true;
  selectedReportAccess: any[] = [];
  visible: boolean = false;
  showManageAccess: boolean = true;
  sampleselectedReportAccessData = reportAccessManageConfig
  constructor(private commonService: CommonService, private reportAccessService: ReportAccessService) {
  }
  ngOnInit(): void {
    this.loadReportAccessData();
    this.selectedReportAccess = [];
  }
  handleSearch(filters: any) {
    this.filteredData = this.reportAccessData.filter(item => {
      let isValid = true;
      if (filters.name) {
          isValid = isValid && item.name.toLowerCase().includes(filters.name.toLowerCase());
      }
      if (filters.fromDate) {
          const itemDate = new Date(item.uploadDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
          const fromDate = new Date(filters.fromDate);
          isValid = isValid && itemDate >= fromDate;
      }
      if (filters.toDate) {
          const itemDate = new Date(item.uploadDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
          const toDate = new Date(filters.toDate);
          isValid = isValid && itemDate <= toDate;
      }
      return isValid;
  });
  console.log(this.filteredData);
  }
  loadReportAccessData() {
    this.reportAccessService.loadReportAccessAsync().then((response) => {
      if (response.isSuccess && response.data != null) {
        const responseData: any[] = response.data;
        console.log("responseData", responseData);
      } else {
        this.commonService.notify('Load data', response.error!, 'error');
      }
    });
    this.reportAccessData = reportAccessTableConfig;
    this.filteredData  = this.reportAccessData;
  }
  onRowSelected(rowData?: any) {
    console.log("rowData", rowData);
    this.visible = true;
  }
  saveManageAccess() {
    console.log("sampleselectedReportAccessData", this.sampleselectedReportAccessData);
  }
}
