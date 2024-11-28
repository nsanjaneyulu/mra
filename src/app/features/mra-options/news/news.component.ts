import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BreadcrumbsComponent } from "../../../core/components/breadcrumbs/breadcrumbs.component";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ReusableCardComponent } from "../../../core/components/reusable/reusable-card/reusable-card.component";
import { newsConfig } from 'src/app/shared/utils/esa-constants';

@Component({
  selector: 'esa-news',
  standalone: true,
  imports: [CommonModule,
    BreadcrumbModule,
    BreadcrumbsComponent,
    ReusableCardComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class NewsComponent implements OnInit {
  showSubTitle: boolean = true;
  cards = newsConfig;
  constructor(private router: Router) {}
  async ngOnInit() {
  }
  onCardClick(cardData: any) {
    if (cardData.title === "Received News") {
      this.router.navigate(['/mraoptions/news/receivedNews']);
    } else if (cardData.title === "Create News") {
      this.router.navigate(['/mraoptions/news/createNews']);
    } else if (cardData.title === "Published News") {
      this.router.navigate(['/mraoptions/news/publishedNews']);
    } else if (cardData.title === "Sales Dashboard PDF") {
      this.router.navigate(['/itadminoptions/uploadSalesDashboard']);
    } else {
      console.log('No matching case found');
    }
  }
}
