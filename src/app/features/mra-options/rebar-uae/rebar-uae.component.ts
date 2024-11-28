import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BreadcrumbsComponent } from "../../../core/components/breadcrumbs/breadcrumbs.component";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { raberUAEConfig } from 'src/app/shared/utils/esa-constants';
import { ReusableCardComponent } from "../../../core/components/reusable/reusable-card/reusable-card.component";

@Component({
    selector: 'esa-rebar-uae',
    standalone: true,
    templateUrl: './rebar-uae.component.html',
    styleUrl: './rebar-uae.component.scss',
    encapsulation: ViewEncapsulation.Emulated,
    imports: [CommonModule,
      BreadcrumbModule,
      BreadcrumbsComponent,
      ReusableCardComponent]
})
export class RebarUaeComponent implements OnInit {
  showSubTitle: boolean = true;
  cards = raberUAEConfig;
  constructor(private router: Router) {}
  async ngOnInit() {
  }
  onCardClick(cardData: any) {
    if (cardData.title === "Overall Vs Sector Wise") {
      this.router.navigate(['/mraoptions/reber-uae/overall-sector-wise']);
    } else if (cardData.title === "Sales Dashboard PDF") {
      this.router.navigate(['/itadminoptions/uploadSalesDashboard']);
    } else {
      console.log('No matching case found');
    }
  }
}
