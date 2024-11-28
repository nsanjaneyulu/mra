import { AfterContentInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'esa-apexchart',
  standalone: true,
  imports: [NgApexchartsModule ],
  templateUrl: './apexchart.component.html',
  styleUrl: './apexchart.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class ApexchartComponent implements OnInit, AfterContentInit {
 
  chartOptions!: ChartOptions;
  chartseries = [10, 41, 35, 51, 49, 62, 69, 91, 148]
  
  constructor(){
    
  }
  ngOnInit(): void {
    
  }

  ngAfterContentInit(): void {
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: this.chartseries
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      title: {
        text: "IO 65% CFR CHN"
      },
      xaxis: {
        categories: ["MTD", "YTD",  "1Yr",  "2yr",  "max",]
      }
    };
  }
}

