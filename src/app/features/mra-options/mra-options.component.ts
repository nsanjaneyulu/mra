import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BreadcrumbsComponent } from "../../core/components/breadcrumbs/breadcrumbs.component";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ReusableCardComponent } from "../../core/components/reusable/reusable-card/reusable-card.component";
import { mraOptionsConfig } from 'src/app/shared/utils/esa-constants';

@Component({
  selector: 'esa-mra-options',
  standalone: true,
  imports: [CommonModule,
    BreadcrumbModule,
    BreadcrumbsComponent,
    ReusableCardComponent],
  templateUrl: './mra-options.component.html',
  styleUrl: './mra-options.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class MraOptionsComponent implements OnInit  {
  showSubTitle: boolean = true;
  cards = mraOptionsConfig;
  constructor(private router: Router) {}
  async ngOnInit() {
  }
  onCardClick(cardData: any) {
    if (cardData.title === "News") {
      this.router.navigate(['/mraoptions/news']);
    } else if (cardData.title === "Sales Dashboard PDF") {
      this.router.navigate(['/itadminoptions/uploadSalesDashboard']);
    } else if (cardData.title === "Exported News Report") {
      this.router.navigate(['/mraoptions/exportedNewsReport']);
    } else if (cardData.title === "Rebar UAE") {
      this.router.navigate(['/mraoptions/reber-uae']);
    } else if (cardData.title === "Upload") {
      this.router.navigate(['/mraoptions/upload']);
    } else if (cardData.title === "Sales Dispatch") {
      this.router.navigate(['/mraoptions/salesDispatch']);
    } else {
      console.log('No matching case found');
    }
  }
}
