import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, NgApexchartsModule,} from 'ng-apexcharts';
import { ChartComponent } from '../chart/chart.component';
import { Router } from '@angular/router';
import { NewsletterService } from '../newsletters/newsletter.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { SourceEnum } from '../newsletters/newslettersDto';
import { PdfViewerInDetailsService } from '../pdf-viewer-in-details/pdf-viewer-in-details.service';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'esa-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    PanelModule,
    TabViewModule,
    TabMenuModule,
    TableModule,
    ButtonModule,
    NgApexchartsModule,
    ScrollPanelModule,
    MenuModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild("chart") chart!: ChartComponent;
  fastmarkets: any;
  kallanish: any;
  worldSteelNewsDaily: any;
  platts: any;
  selectedCountry!: any;
  newsletterData: any;
   chartOptions!: ChartOptions;
  trikerTabs: { title: string; content: string }[] = [];
  trikerList: { title: string; price: number | string; date: string }[] = [];
  scrollableTabs: any[] = [{ title: 'Title', content: 'Content' }];
  mranewsUpdate: { title: string }[] = [];
  newsletters: {
    title?: string;
    icon: string;
    date: string;
    isToday: boolean;
  }[] = [];
  trickerData: {
    name: string;
    value: number | string;
    curency: string;
    valChange: string;
    frequency: string;
    source: string;
  }[] = [];

  constructor(private pdfViewerInDetailsService:PdfViewerInDetailsService, private router: Router, private newsletterService: NewsletterService, private commonService: CommonService) {
  }

  ngOnInit(): void {
    
    this.setTrickerstTabs();
    this.setTrickers();
    this.setMRANews();
    this.getTricker();
    this.getNewsLetters();
    this.getNewsletterData();
   
  }

  setTrickers() {
    this.trikerList.push(
      this.getTrickers({
        title: 'Rebar FOB TUR',
        price: 602.4,
        date: 'Dec 18',
      }),
      this.getTrickers({
        title: 'IO 65% CFR CHN',
        price: 602.4,
        date: 'Dec 18',
      }),
      this.getTrickers({
        title: 'IO 62% CFR CHN',
        price: 602.4,
        date: 'Dec 18',
      }),
      this.getTrickers({ title: 'HCC FOB AUS', price: 602.4, date: 'Dec 18' }),
      this.getTrickers({
        title: 'HRC FOB Black Sea',
        price: 602.4,
        date: 'Dec 18',
      }),
      this.getTrickers({
        title: 'Billet FOB Black Sea',
        price: 602.4,
        date: 'Dec 18',
      }),
      this.getTrickers({
        title: 'Scrap HMS Cfr TUR',
        price: 602.4,
        date: 'Dec 18',
      })
    );
  }
  getTrickers(Tricker: {
    title: string;
    price: number | string;
    date: string;
  }) {
    return Tricker;
  }
  setTrickerstTabs() {
    this.trikerTabs.push(
      this.getTrickerTabs({ title: 'Overview', content: 'Overview' }),
      this.getTrickerTabs({ title: 'Iron Ore', content: 'Iron Ore' }),
      this.getTrickerTabs({ title: 'Scrap', content: 'Scrap' }),
      this.getTrickerTabs({ title: 'Billet', content: 'Billet' }),
      this.getTrickerTabs({ title: 'Rebar', content: 'Rebar' }),
      this.getTrickerTabs({ title: 'Wire Rod', content: 'Wire Rod' }),
      this.getTrickerTabs({ title: 'Sections', content: 'Sections' })
    );
  }

  getTrickerTabs(trickerTab: { title: string; content: string }) {
    return trickerTab;
  }

  setMRANews() {
    this.mranewsUpdate.push(
      this.getMRANews({
        title: 'Tricker Prices updated 12 January 2024 09:20 AM ',
      }),
      this.getMRANews({
        title: 'Tricker Prices updated 12 January 2024 09:20 AM ',
      }),
      this.getMRANews({
        title: 'Tricker Prices updated 12 January 2024 09:20 AM ',
      }),
      this.getMRANews({
        title: 'Tricker Prices updated 12 January 2024 09:20 AM ',
      }),
      this.getMRANews({
        title: 'Tricker Prices updated 12 January 2024 09:20 AM ',
      }),
      this.getMRANews({
        title: 'Tricker Prices updated 12 January 2024 09:20 AM ',
      }),
      this.getMRANews({
        title: 'Tricker Prices updated 12 January 2024 09:20 AM ',
      })
    );
  }
  getMRANews(MraNews: { title: string }) {
    return MraNews;
  }

  setTrickersData(Tricker: {
    name: string;
    value: number | string;
    curency: string;
    valChange: string;
    date: string;
    frequency: string;
    source: string;
  }) {
    return Tricker;
  }
  getTricker() {
    this.trickerData.push(
      this.setTrickersData({
        name: 'Rebar FOB TUR',
        value: 2,
        curency: 'USD',
        valChange: '',
        date: '16/12/20224',
        frequency: '2min',
        source: 'Dev',
      }),
      this.setTrickersData({
        name: 'IO 65% CFR CHN',
        value: 2,
        curency: 'USD',
        valChange: '',
        date: '16/12/20224',
        frequency: '2min',
        source: 'Dev',
      }),
      this.setTrickersData({
        name: 'IO 62% CFR CHN',
        value: 2,
        curency: 'USD',
        valChange: '',
        date: '16/12/20224',
        frequency: '2min',
        source: 'Dev',
      }),
      this.setTrickersData({
        name: 'HCC FOB AUS',
        value: 2,
        curency: 'USD',
        valChange: '',
        date: '16/12/20224',
        frequency: '2min',
        source: 'Dev',
      }),
      this.setTrickersData({
        name: 'HRC FOB Black Sea',
        value: 2,
        curency: 'USD',
        valChange: '',
        date: '16/12/20224',
        frequency: '2min',
        source: 'Dev',
      }),
      this.setTrickersData({
        name: 'Billet FOB Black Sea',
        value: 2,
        curency: 'USD',
        valChange: '',
        date: '16/12/20224',
        frequency: '2min',
        source: 'Dev',
      }),
      this.setTrickersData({
        name: 'Scrap HMS Cfr TUR',
        value: 2,
        curency: 'USD',
        valChange: '',
        date: '16/12/20224',
        frequency: '2min',
        source: 'Dev',
      })
    );
  }

  setNewsLetters(NewsLetters: {
    title?: string;
    icon: string;
    date: string;
    isToday: boolean;
  }) {
    return NewsLetters;
  }

  getNewsLetters() {
    this.newsletters.push(
      this.setNewsLetters({
        title: '2023-12-18_Newsletter.pdf',
        icon: 'esa-icon esa-icon-24',
        date: '29-Dec',
        isToday: true,
      }),
      this.setNewsLetters({
        title: '2023-12-18_Newsletter.pdf',
        icon: 'esa-icon esa-icon-24',
        date: '18-Dec',
        isToday: false,
      }),
      this.setNewsLetters({
        title: '2023-12-18_Newsletter.pdf',
        icon: 'esa-icon esa-icon-24',
        date: '17-Dec',
        isToday: false,
      }),
      this.setNewsLetters({
        title: '2023-12-18_Newsletter.pdf',
        icon: 'esa-icon esa-icon-24',
        date: '16-Dec',
        isToday: false,
      }),
      this.setNewsLetters({
        title: '2023-12-18_Newsletter.pdf',
        icon: 'esa-icon esa-icon-24',
        date: '15-Dec',
        isToday: false,
      }),
      this.setNewsLetters({
        title: '2023-12-18_Newsletter.pdf',
        icon: 'esa-icon esa-icon-24',
        date: '14-Dec',
        isToday: false,
      }),
      this.setNewsLetters({
        title: '2023-12-18_Newsletter.pdf',
        icon: 'esa-icon esa-icon-24',
        date: '13-Dec',
        isToday: false,
      })
    );
    this.areaChartLoad()
  }

  ngAfterViewInit() {
  }

  areaChartLoad(){
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      title: {
        text: "Rebar FOB TUR"
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
      }
    };
  }
  // openPdf() {
  //   this.router.navigate(['newsletters/newslettersindetails']);
  // }
  openReportsPdf() {
    window.open("/assets/pdf-test.pdf", '_blank');
  }

  getNewsletterData() {
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
    return this.newsletterData.filter((item: any) => item.source === source).slice(0, 7);;
  }
  
}
