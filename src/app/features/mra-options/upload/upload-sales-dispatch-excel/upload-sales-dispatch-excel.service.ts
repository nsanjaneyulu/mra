import { Injectable } from '@angular/core';
import { RestService } from 'src/app/shared/services/rest.service';
import { ApiUrls } from 'src/app/shared/utils/esa-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadSalesDispatchExcelService {
  constructor(private restService: RestService) {}
  async getSalesDispatchExceAsync() {
    return await this.restService.fetch<any[]>({
      url: `${environment.apiBaseUrl}${ApiUrls.getSalesDispatch}`,
    });
  }
  async uploadSalesDispatchExcelsync(model?: any) {
    return await this.restService.send<any>({
      url: `${environment.apiBaseUrl}${ApiUrls.uploadSalesAndDispatchExcel}`,
      payload: model,
    });
  }
  async viewSalesDispatchExcelAsync(id?: any) {
    return await this.restService.fetch<any[]>({
      url: `${environment.apiBaseUrl}${ApiUrls.viewSalesDispatch}/${id}`,
    });
  }
  async deleteSalesDispatchExcelAsync(id: any) {
    return await this.restService.delete<any>({
      url: `${environment.apiBaseUrl}${ApiUrls.deleteSalesDispatch}/${id}`,
    });
  }
}
