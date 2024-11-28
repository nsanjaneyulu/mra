import { Component, ViewEncapsulation } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'esa-overall-sector-wise',
  standalone: true,
  imports: [ChartModule, NgApexchartsModule],
  templateUrl: './overall-sector-wise.component.html',
  styleUrl: './overall-sector-wise.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class OverallSectorWiseComponent {
  series: any;
  chart: any;
  xaxis: any;
  yaxis: any;
  tooltip: any;
  sectorwiseData: any;

  sampleData = {
    estimated: [153474, 157000, 162000, 158000, 160000, 153474, 157000, 162000, 158000, 160000, 158000, 160000],
    actual: [157000, 160000, 163000, 159000, 161000, 157000, 160000, 163000, 159000, 161000, 159000, 161000],
    accuracy: [98567, 98234, 53489, 78234, 87456, 98567, 98234, 53489, 78234, 87456, 78234, 87456],
    esRetailPrices: [57898, 67523, 89234, 56129, 12907, 57898, 67523, 89234, 56129, 12907, 56129, 12907],
    nonEsRetailPrices: [123412, 129876, 156349, 198345, 168934, 123412, 129876, 156349, 198345, 168934, 198345, 168934],
    months: ['Jan 2022', 'Feb 2022', 'Mar 2022', 'Apr 2022', 'May 2022', 'Jun 2022', 'Jul 2022', 'Aug 2022', 'Sep 2022', 'Oct 2022', 'Nov 2022', 'Dec 2022'],
    sectorwise: {
      labels: ['Industrial', 'Oil and Gas', 'Transport', 'Urban Construction', 'Utilities'],
      data: [
        [32000, 35000, 40000, 45000, 30000],
        [33000, 36000, 41000, 46000, 31000],
        [34000, 37000, 42000, 47000, 32000],
        [35000, 38000, 43000, 48000, 33000],
        [36000, 39000, 44000, 49000, 34000],
        [32000, 35000, 40000, 45000, 30000],
        [33000, 36000, 41000, 46000, 31000],
        [34000, 37000, 42000, 47000, 32000],
        [35000, 38000, 43000, 48000, 33000],
        [36000, 39000, 44000, 49000, 34000],
        [34000, 37000, 42000, 47000, 32000],
        [35000, 38000, 43000, 48000, 33000]
      ]
    }
  };

  ngOnInit() {
    this.series = [
      {
        name: 'Estimated (MT)',
        type: 'line',
        data: this.sampleData.estimated
      },
      {
        name: 'Actual (MT)',
        type: 'line',
        data: this.sampleData.actual
      },
      {
        name: 'Accuracy (%)',
        type: 'bar',
        data: this.sampleData.accuracy
      },
      {
        name: 'ES Retail Prices (SMT)',
        type: 'line',
        data: this.sampleData.esRetailPrices
      },
      {
        name: 'Non ES Retail Prices (SMT)',
        type: 'line',
        data: this.sampleData.nonEsRetailPrices
      }
    ];

    this.chart = {
      height: 350,
      type: 'line'
    };

    this.xaxis = {
      categories: this.sampleData.months
    };

    this.yaxis = [
      {
        title: {
          text: 'MT',
          data: this.sampleData.nonEsRetailPrices
        }
      },
      {
        title: {
          text: 'TMT',
          data: this.sampleData.nonEsRetailPrices
        }
      },
      {
        opposite: true,
        title: {
          text: 'SMT',
          data: this.sampleData.nonEsRetailPrices
        },
      }
    ];

    this.tooltip = {
      shared: true,
      intersect: false
    };

    this.sectorwiseData = {
      labels: this.sampleData.sectorwise.labels,
      datasets: [
        {
          label: 'Feb 2023',
          backgroundColor: '#42A5F5',
          data: this.sampleData.sectorwise.data[0]
        },
        {
          label: 'Mar 2023',
          backgroundColor: '#66BB6A',
          data: this.sampleData.sectorwise.data[1]
        },
        {
          label: 'Apr 2023',
          backgroundColor: '#FFA726',
          data: this.sampleData.sectorwise.data[2]
        },
        // Add more datasets as needed
      ]
    };
  }

}
