import { Component, ViewEncapsulation } from '@angular/core';
import { ReusableSearchFilterComponent } from "../../../core/components/reusable/reusable-search-filter/reusable-search-filter.component";
import { exportedNewsReportTableColumnsConfig, exportedNewsReportTableConfig} from './exported-news-reportDto';
import { ExportedNewsReportService } from './exported-news-report.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { ImportsModule } from '../../../shared/utils/imports';
import { ReusableTableComponent } from "../../../core/components/reusable/reusable-table/reusable-table.component";

@Component({
  selector: 'esa-exported-news-report',
  standalone: true,
  imports: [ImportsModule, ReusableSearchFilterComponent, ReusableTableComponent],
  templateUrl: './exported-news-report.component.html',
  styleUrl: './exported-news-report.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class ExportedNewsReportComponent {
  exportedNewsReportData: any[] = [];
  filteredData : any;
  pageSize: number = 10;
  rowsPerPageOptions: number[] = [10, 20, 30];
  columns = exportedNewsReportTableColumnsConfig;
  showAction: boolean = true;
  constructor(private exportedNewsReportService: ExportedNewsReportService, private commonService: CommonService) {
  }
  ngOnInit(): void {
    this.loadExportedNewsReportData();
  }
  loadExportedNewsReportData() {
    this.exportedNewsReportService.loadExportedNewsReportAsync().then((response) => {
      if (response.isSuccess && response.data != null) {
        const responseData: any[] = response.data;
        this.filteredData = exportedNewsReportTableConfig;
        this.exportedNewsReportData = exportedNewsReportTableConfig;
        console.log("responseData", responseData);
      } else {
        this.commonService.notify('Load data', response.error!, 'error');
      }
    });
  }
}
