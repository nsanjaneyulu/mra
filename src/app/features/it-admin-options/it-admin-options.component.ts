import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BreadcrumbsComponent } from "../../core/components/breadcrumbs/breadcrumbs.component";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ReusableCardComponent } from "../../core/components/reusable/reusable-card/reusable-card.component";
import { itAdminOptionsConfig } from 'src/app/shared/utils/esa-constants';
@Component({
    selector: 'esa-it-admin-options',
    standalone: true,
    templateUrl: './it-admin-options.component.html',
    styleUrl: './it-admin-options.component.scss',
    encapsulation: ViewEncapsulation.Emulated,
    imports: [
        CommonModule,
        BreadcrumbModule,
        BreadcrumbsComponent,
        ReusableCardComponent
    ]
})
export class ItAdminOptionsComponent implements  OnInit {
  showSubTitle: boolean = false;
  cards = itAdminOptionsConfig;
  constructor(private router: Router) {}
  async ngOnInit() {
  }
  onCardClick(cardData: any) {
    if (cardData.title === "User Management") {
      this.router.navigate(['/itadminoptions/userManagement']);
    } else if (cardData.title === "Report Access") {
      this.router.navigate(['/itadminoptions/reportAccess']);
    } else if (cardData.title === "Sales Dashboard PDF") {
      this.router.navigate(['/itadminoptions/uploadSalesDashboard']);
    } else {
      console.log('No matching case found');
    }
  }
}
