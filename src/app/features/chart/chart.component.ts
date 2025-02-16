import { Component,ViewEncapsulation } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
 
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexYAxis,
  ApexFill,
  ApexLegend,

} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  colors: string[];
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'esa-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class ChartComponent {
  public chartOptions: Partial<ChartOptions>; 
  series:[] = [];
  
  constructor(){
    this.chartOptions = {
      series: [
        {
          data: [
            {
              x: "2008",
              y: [2800, 4500]
            },
            {
              x: "2009",
              y: [3200, 4100]
            },
            {
              x: "2010",
              y: [2950, 7800]
            },
            {
              x: "2011",
              y: [3000, 4600]
            },
            {
              x: "2012",
              y: [3500, 4100]
            },
            {
              x: "2013",
              y: [4500, 6500]
            },
            {
              x: "2014",
              y: [4100, 5600]
            }
          ]
        }
      ],
      chart: {
        height: 350,
        type: "rangeBar",
        zoom: {
          enabled: false
        }
      },
      
      legend: {
        show: true,
        showForSingleSeries: true,
        position: "top",
        horizontalAlign: "left",
        customLegendItems: ["Product A", "Product B"]
      },
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          gradientToColors: ["#00E396"],
          inverseColors: true,
          stops: [0, 100]
        }
      },
     
      xaxis: {
        tickPlacement: "on"
      }
    };
  }
  }

