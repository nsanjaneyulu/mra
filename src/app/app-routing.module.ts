import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserManagementComponent } from './features/it-admin-options/user-management/user-management.component';
import { ItAdminOptionsComponent } from './features/it-admin-options/it-admin-options.component';
import { NewslettersComponent } from './features/newsletters/newsletters.component';
import { PdfViewerInDetailsComponent } from './features/pdf-viewer-in-details/pdf-viewer-in-details.component';
import { UploadSalesDashboardComponent } from './features/it-admin-options/upload-sales-dashboard/upload-sales-dashboard.component';
import { MraOptionsComponent } from './features/mra-options/mra-options.component';
import { NewsComponent } from './features/mra-options/news/news.component';
import { ReceivedNewsComponent } from './features/mra-options/news/received-news/received-news.component';
import { CreateNewsComponent } from './features/mra-options/news/create-news/create-news.component';
import { ReusableRouteComponent } from './core/components/reusable-route/reusable-route.component';
import { RebarUaeComponent } from './features/mra-options/rebar-uae/rebar-uae.component';
import { OverallSectorWiseComponent } from './features/mra-options/rebar-uae/overall-sector-wise/overall-sector-wise.component';
import { ReportAccessComponent } from './features/it-admin-options/report-access/report-access.component';
import { PublishedNewsComponent } from './features/mra-options/news/published-news/published-news.component';
import { UploadNewsletterComponent } from './features/mra-options/upload/upload-newsletter/upload-newsletter.component';
import { UploadComponent } from './features/mra-options/upload/upload.component';
import { UploadSalesDispatchExcelComponent } from './features/mra-options/upload/upload-sales-dispatch-excel/upload-sales-dispatch-excel.component';
import { ExportedNewsReportComponent } from './features/mra-options/exported-news-report/exported-news-report.component';
import { SalesDispatchComponent } from './features/mra-options/sales-dispatch/sales-dispatch.component';
import { UploadReportComponent } from './features/mra-options/upload/upload-report/upload-report.component';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Home' },
    title: ' Dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'dashboard',
    data: { breadcrumb: 'Home' },
    title: ' Dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'saleDashboard/:id?',
    data: { breadcrumb: 'Sales Dashboard' },
    title: 'Sales Dashboard',
    loadComponent: () =>
      import('./features/sales-dashboard/sales-dashboard.component').then(
        (c) => c.SalesDashboardComponent
      ),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'predictive-analysis',
    data: { breadcrumb: 'Predictive Analysis' },
    title: 'Predictive Analysis',
    loadComponent: () =>
      import(
        './features/predictive-analysis/predictive-analysis.component'
      ).then((c) => c.PredictiveAnalysisComponent),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'reports',
    data: { breadcrumb: 'Reports' },
    title: 'Reports',
    loadComponent: () =>
      import('./features/reports/reports.component').then(
        (c) => c.ReportsComponent
      ),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'access-denied',
    data: { breadcrumb: 'Access Denied' },
    title: 'Access Denied',
    loadComponent: () =>
      import('./core/components/accessdenied/accessdenied.component').then(
        (c) => c.AccessDeniedComponent
      ),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'tickers',
    data: { breadcrumb: 'Tickers' },
    title: 'Tickers',
    loadComponent: () =>
      import('./features/trickers/trickers.component').then(
        (c) => c.TrickersComponent
      ),
  },
  {
    path: 'terminal-guide',
    data: { breadcrumb: 'Terminal Guide' },
    title: 'Terminal Guide',
    loadComponent: () =>
      import('./features/terminal-guide/terminal-guide.component').then(
        (c) => c.TerminalGuideComponent
      ),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'connectwithus',
    data: { breadcrumb: 'Contact Us' },
    title: 'Connect with Us',
    loadComponent: () =>
      import('./features/connect-withus/connect-withus.component').then(
        (c) => c.ConnectWithusComponent
      ),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'mraoptions',
    component: ReusableRouteComponent,
    data: { breadcrumb: 'MRA Options' },
    title: 'MRA Options',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: MraOptionsComponent,
        data: { breadcrumb: '' },
        canActivate: [AuthGuard],
      },
      {
        path: 'news',
        component: ReusableRouteComponent,
        data: { breadcrumb: 'News' },
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: NewsComponent,
            data: { breadcrumb: '' },
            canActivate: [AuthGuard],
          },
          {
            path: 'receivedNews',
            component: ReceivedNewsComponent,
            data: { breadcrumb: 'Received News' },
            canActivate: [AuthGuard], // Ensure canActivate is used here
          },
          {
            path: 'publishedNews',
            component: PublishedNewsComponent,
            data: { breadcrumb: 'Published News' },
            canActivate: [AuthGuard], // Ensure canActivate is used here
          },
          {
            path: 'createNews',
            component: CreateNewsComponent,
            data: { breadcrumb: 'Create News' },
            canActivate: [AuthGuard], // Ensure canActivate is used here
          },
        ],
      },
      {
        path: 'exportedNewsReport',
        component: ReusableRouteComponent,
        data: { breadcrumb: 'Exported News Report' },
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: ExportedNewsReportComponent,
            data: { breadcrumb: '' },
            canActivate: [AuthGuard],
          },
        ],
      },
      {
        path: 'salesDispatch',
        component: SalesDispatchComponent,
        data: { breadcrumb: 'Sales Dispatch' },
        canActivate: [AuthGuard],
      },
      {
        path: 'reber-uae',
        component: ReusableRouteComponent,
        data: { breadcrumb: 'Reber UAE' },
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: RebarUaeComponent,
            data: { breadcrumb: '' },
            canActivate: [AuthGuard],
          },
          {
            path: 'overall-sector-wise',
            component: OverallSectorWiseComponent,
            data: { breadcrumb: 'Overall Sector Wise' },
            canActivate: [AuthGuard], // Ensure canActivate is used here
          },
        ],
      },
      {
        path: 'upload',
        component: ReusableRouteComponent,
        data: { breadcrumb: 'Upload' },
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: UploadComponent,
            data: { breadcrumb: '' },
            canActivate: [AuthGuard],
          },
          {
            path: 'uploadReport',
            component: UploadReportComponent,
            data: { breadcrumb: 'Report' },
            canActivate: [AuthGuard], // Ensure canActivate is used here
          },
          {
            path: 'uploadNewsletter',
            component: UploadNewsletterComponent,
            data: { breadcrumb: 'Newsletter' },
            canActivate: [AuthGuard], // Ensure canActivate is used here
          },
          {
            path: 'uploadSalesDispatchExcel',
            component: UploadSalesDispatchExcelComponent,
            data: { breadcrumb: 'Sales Dispatch Excel' },
            canActivate: [AuthGuard], // Ensure canActivate is used here
          },
        ],
      },
    ],
  },
  {
    path: 'itadminoptions',
    component: ReusableRouteComponent,
    data: {
      breadcrumb: 'IT Admin Options',
    },
    title: 'IT Admin Options',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'userManagement',
        component: UserManagementComponent,
        data: {
          breadcrumb: 'User Management',
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'reportAccess',
        component: ReportAccessComponent,
        data: {
          breadcrumb: 'Report Access',
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'uploadSalesDashboard',
        component: UploadSalesDashboardComponent,
        data: {
          breadcrumb: 'Sales Dashboard PDF',
        },
        canActivate: [AuthGuard],
      },
      {
        path: '',
        data: {
          breadcrumb: '',
        },
        component: ItAdminOptionsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'newsletters',
    component: ReusableRouteComponent,
    data: {
      breadcrumb: 'Newsletters',
    },
    title: 'Newsletters',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'newslettersindetails',
        component: PdfViewerInDetailsComponent,
        data: {
          breadcrumb: 'View Details',
        },
        canActivate: [AuthGuard],
      },
      {
        path: '',
        data: {
          breadcrumb: '',
        },
        component: NewslettersComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  // {path:'apexchart', data:{breadcrumb:'apexchart'},  title:'apexchart', loadComponent:() => import('./features/apexchart/apexchart.component').then(c => c.ApexchartComponent), canActivateChild: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      enableTracing: false,
      initialNavigation: 'enabledNonBlocking',
      urlUpdateStrategy: 'eager',
      scrollPositionRestoration: 'enabled',
      scrollOffset: [0, 0],
      paramsInheritanceStrategy: 'always',
      onSameUrlNavigation: 'reload',
      canceledNavigationResolution: 'replace',
      preloadingStrategy: NoPreloading,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
