import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportsModule } from '../../../shared/utils/imports';
import { SalesDispatchService } from './sales-dispatch.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { SourceEnum } from './sales-dispatchDto';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'esa-sales-dispatch',
  standalone: true,
  imports: [CommonModule, ImportsModule, TooltipModule],
  templateUrl: './sales-dispatch.component.html',
  styleUrl: './sales-dispatch.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class SalesDispatchComponent {
  salesDispatchData: any;
  dsalesDispatchData: any;
  sectionSheet: any;
  rebar: any;
  scrapOther: any;
  constructor(private salesDispatchService: SalesDispatchService, private commonService: CommonService) { }

  ngOnInit() {
    this.getSalesDispatchData();
  }
  getSalesDispatchData() {
    this.salesDispatchService.getSalesDispatchAsync().then((response) => {
      if (response.isSuccess && response.data != null) {
        let responseData: any[] = response.data;
        const currentYear = new Date().getFullYear();
        let updatedPeriod = responseData.map(item => {
        const startYear = new Date(item.startDate).getFullYear();
        const endYear = new Date(item.endDate).getFullYear();
        const period = endYear === currentYear ? `${endYear} - Till Now` : `${startYear} - ${endYear}`;
        return { ...item, period };
        });
        responseData = updatedPeriod
        this.salesDispatchData = responseData;
        this.dsalesDispatchData = this.filterBySource(SourceEnum.dsalesDispatchData);
        this.rebar = this.filterBySource(SourceEnum.rebar);
        this.sectionSheet = this.filterBySource(SourceEnum.sectionSheet);
        this.scrapOther = this.filterBySource(SourceEnum.scrapOther);
      } else {
        this.commonService.notify('Load data', response.error!, 'error');
      }
    });
  }
  filterBySource(category: any) {
    console.log("category", category);
    return this.salesDispatchData.filter((item: any) => item.category === category);
  }
  truncate(text: string, limit: number): string {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }
}
