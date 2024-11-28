import { Injectable } from '@angular/core';
import { RestService } from 'src/app/shared/services/rest.service';
import { ApiUrls } from 'src/app/shared/utils/esa-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadSalesDashboardService {
  constructor(private restService: RestService) {}
  async loadUploadSalesDashboardAsync() {
    return await this.restService.fetch<any[]>({
      url: `${environment.apiBaseUrl}${ApiUrls.getSalesdashboardpdf}`,
    });
  }
  async addSalesDashboardDataSync(addUploadSalesPDFsync?: any) {
    return await this.restService.send<any>({
      url: `${environment.apiBaseUrl}${ApiUrls.addUploadSalesDashboard}`,
      payload: addUploadSalesPDFsync,
    });
  }
  async getSalesDashboardDataAsync() {
    return await this.restService.fetch<any[]>({
      url: `${environment.apiBaseUrl}${ApiUrls.getAllSalesDashboardPdf}`,
    });
  }
}
