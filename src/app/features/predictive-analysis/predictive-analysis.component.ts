
import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'esa-predictive-analysis',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule,],
  templateUrl: './predictive-analysis.component.html',
  styleUrls: ['./predictive-analysis.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PredictiveAnalysisComponent {

}
