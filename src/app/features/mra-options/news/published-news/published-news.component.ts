import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ImportsModule } from '../../../../shared/utils/imports';
import { CommonModule } from '@angular/common';
import { ReusableButtonComponent } from '../../../../core/components/reusable/reusable-button/reusable-button.component';
import { Router } from '@angular/router';
import { PublishedNewsService } from './published-news.service';
import { ReusableSearchFilterComponent } from '../../../../core/components/reusable/reusable-search-filter/reusable-search-filter.component';
import {
  searchPublishedNewsConfig,
  publishedNewsTableColumnsConfig,
  publishedNewsTableDataConfig,
} from './published-newsDto';
import { ReusableTableCollapseComponent } from '../../../../core/components/reusable/reusable-table-collapse/reusable-table-collapse.component';
import { CommonService } from 'src/app/shared/services/common.service';
@Component({
  selector: 'esa-published-news',
  standalone: true,
  templateUrl: './published-news.component.html',
  styleUrl: './published-news.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  imports: [
    ImportsModule,
    CommonModule,
    ReusableButtonComponent,
    ReusableSearchFilterComponent,
    ReusableTableCollapseComponent,
  ],
})
export class PublishedNewsComponent implements OnInit {
  fields = searchPublishedNewsConfig;
  columns = publishedNewsTableColumnsConfig;
  showAction: boolean = true;
  showActionButton: boolean = true;
  publishedNewsData: any[] = [];
  filteredData: any;
  pageSize: number = 10;
  rowsPerPageOptions: number[] = [10, 20, 30];

  constructor(
    private router: Router,
    private publishedNewsService: PublishedNewsService,
    private commonService: CommonService
  ) {}
  ngOnInit() {
    this.loadReceivedNewsData();
    this.columns = publishedNewsTableColumnsConfig;
  }
  onRowSelected(row: any) {
    // this.selectedRow = event.data;
    console.log('Selected row:', row);
  }

  onActionClicked(row: any) {
    console.log('Action clicked for row:', row);
  }
  onEditPublishClick(cardData?: any) {
    console.log('cardData', cardData);
    this.router.navigate(['/mraoptions/news/createNews']);
  }
  loadReceivedNewsData() {
    this.publishedNewsService.loadPublishedNewsAsync().then((response) => {
      if (response.isSuccess && response.data != null) {
        const responseData: any[] = response.data;
        this.filteredData = publishedNewsTableDataConfig;
        this.publishedNewsData = publishedNewsTableDataConfig;
        console.log('responseData', responseData);
      } else {
        this.commonService.notify('Load data', response.error!, 'error');
      }
    });
  }
  handleSearch(filters: any) {
    console.log('filters', filters);
    this.filteredData = this.publishedNewsData.filter((item) => {
      let isValid = true;
      if (filters.name) {
        isValid =
          isValid &&
          item.name.toLowerCase().includes(filters.name.toLowerCase());
      }
      if (filters.fromDate) {
        const itemDate = new Date(
          item.uploadDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')
        );
        const fromDate = new Date(filters.fromDate);
        isValid = isValid && itemDate >= fromDate;
      }
      if (filters.toDate) {
        const itemDate = new Date(
          item.uploadDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')
        );
        const toDate = new Date(filters.toDate);
        isValid = isValid && itemDate <= toDate;
      }
      return isValid;
    });
    console.log(this.filteredData);
  }
}
