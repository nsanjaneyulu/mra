import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ImportsModule } from '../../../../shared/utils/imports';
import { CommonModule } from '@angular/common';
import { ReusableButtonComponent } from "../../../../core/components/reusable/reusable-button/reusable-button.component";
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { ReceivedNewsService } from './received-news.service';
import { ReusableSearchFilterComponent } from "../../../../core/components/reusable/reusable-search-filter/reusable-search-filter.component";
import { searchReceivedNewsConfig, receivedNewsTableColumnsConfig, receivedNewsTableDataConfig} from './received-newsDto';
import { ReusableTableCollapseComponent } from "../../../../core/components/reusable/reusable-table-collapse/reusable-table-collapse.component";
@Component({
    selector: 'esa-received-news',
    standalone: true,
    templateUrl: './received-news.component.html',
    styleUrl: './received-news.component.scss',
    encapsulation: ViewEncapsulation.Emulated,
    imports: [ImportsModule, CommonModule, ReusableButtonComponent, ReusableSearchFilterComponent, ReusableTableCollapseComponent]
})
export class ReceivedNewsComponent implements OnInit {
  fields = searchReceivedNewsConfig;
  columns = receivedNewsTableColumnsConfig;
  showAction: boolean = true;
  showActionButton: boolean = true;
  receivednewsData: any[] = [];
  filteredData : any;
  pageSize: number = 10;
  rowsPerPageOptions: number[] = [10, 20, 30];
  constructor(private router: Router, private receivedNewsService:ReceivedNewsService, private commonService:CommonService) {}
  ngOnInit() {
    this.loadReceivedNewsData();
  }
  onRowSelected(row: any) {
    console.log('Selected row:', row);
  }
  onEditPublishClick(cardData?: any) {
    console.log("cardData", cardData);
      this.router.navigate(['/mraoptions/news/createNews']);
  }
  handleSearch(filters: any) {
    console.log("filters", filters);
    this.filteredData = this.receivednewsData.filter(item => {
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
loadReceivedNewsData() {
  this.receivedNewsService.loadReceivedNewsAsync().then((response) => {
    if (response.isSuccess && response.data != null) {
      const responseData: any[] = response.data;
      this.filteredData = receivedNewsTableDataConfig;
      this.receivednewsData = receivedNewsTableDataConfig;
      console.log("responseData", responseData);
    } else {
      this.commonService.notify('Load data', response.error!, 'error');
    }
  });
}
}
