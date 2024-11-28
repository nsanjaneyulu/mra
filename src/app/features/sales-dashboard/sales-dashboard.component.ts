import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerInDetailsComponent } from '../pdf-viewer-in-details/pdf-viewer-in-details.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'esa-sales-dashboard',
  standalone: true,
  templateUrl: './sales-dashboard.component.html',
  styleUrls: ['./sales-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  imports: [CommonModule, PdfViewerInDetailsComponent],
})
export class SalesDashboardComponent implements OnInit {
  salesDashboard: boolean = true;
  id: string | null = null;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id?');
    });
  }
}
