import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BreadcrumbsComponent } from "../../../core/components/breadcrumbs/breadcrumbs.component";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ReusableCardComponent } from "../../../core/components/reusable/reusable-card/reusable-card.component";
import { uploadConfig } from 'src/app/shared/utils/esa-constants';

@Component({
  selector: 'esa-upload',
  standalone: true,
  imports: [CommonModule,
    BreadcrumbModule,
    BreadcrumbsComponent,
    ReusableCardComponent],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class UploadComponent implements OnInit {
  showSubTitle: boolean = true;
  cards = uploadConfig;
  constructor(private router: Router) {}
  async ngOnInit() {
  }
  onCardClick(cardData: any) {
    if (cardData.title === "News Letter") {
      this.router.navigate(['/mraoptions/upload/uploadNewsletter']);
    } else if (cardData.title === "Sales Dispatch Excel") {
      this.router.navigate(['/mraoptions/upload/uploadSalesDispatchExcel']);
    } else if (cardData.title === "Rebar UAE") {
      this.router.navigate(['/mraoptions/reber-uae']);
    } else if (cardData.title === "Upload") {
      this.router.navigate(['/mraoptions/upload']);
    } else if (cardData.title === "Report") {
      this.router.navigate(['/mraoptions/upload/uploadReport']);
    } else {
      console.log('No matching case found');
    }
  }
}
