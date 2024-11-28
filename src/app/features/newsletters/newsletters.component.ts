import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportsModule } from '../../shared/utils/imports';
import { Router } from '@angular/router';
import { SourceEnum } from './newslettersDto';
import { NewsletterService } from './newsletter.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { TooltipModule } from 'primeng/tooltip';
import { PdfViewerInDetailsService } from '../pdf-viewer-in-details/pdf-viewer-in-details.service';
@Component({
  selector: 'esa-newsletters',
  standalone: true,
  imports: [CommonModule, ImportsModule, TooltipModule],
  templateUrl: './newsletters.component.html',
  styleUrls: ['./newsletters.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class NewslettersComponent implements OnInit {
  fastmarkets: any;
  kallanish: any;
  worldSteelNewsDaily: any;
  platts: any;
  selectedCountry!: any;
  newsletterData: any;
  constructor(private pdfViewerInDetailsService: PdfViewerInDetailsService, private router: Router, private newsletterService: NewsletterService, private commonService: CommonService) { }
  ngOnInit() {
    this.loadNewsletterData();
  }
  loadNewsletterData() {
    this.newsletterService.loadNewsletterAsync().then((response) => {
      if (response.isSuccess && response.data != null) {
        const responseData: any[] = response.data;
        this.newsletterData = responseData;
        this.fastmarkets = this.filterBySource(SourceEnum.Fastmarkets);
        this.kallanish = this.filterBySource(SourceEnum.Kallanish);
        this.worldSteelNewsDaily = this.filterBySource(SourceEnum.worldSteel);
        this.platts = this.filterBySource(SourceEnum.ssb);
      } else {
        this.commonService.notify('Load data', response.error!, 'error');
      }
    });
  }
  openPdf(item?: any) {
    this.pdfViewerInDetailsService.setData({ getRequiredData: item?.id });
    this.router.navigate(['newsletters/newslettersindetails']);
  }
  filterBySource(source: any) {
    return this.newsletterData.filter((item: any) => item.source === source);
  }
  truncate(text: string, limit: number): string {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }
}
