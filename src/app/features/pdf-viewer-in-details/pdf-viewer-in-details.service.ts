import { Injectable } from '@angular/core';
import { RestService } from 'src/app/shared/services/rest.service';
import { ApiUrls } from 'src/app/shared/utils/esa-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PdfViewerInDetailsService {
  public getRequiredData: any;
  constructor(private restService: RestService) {}
  async getNewsletterpdfAsync(getRequiredData?: any) {
    return await this.restService.fetch<any[]>({
      url: `${environment.apiBaseUrl}${
        ApiUrls.getnewsletterpdf + '/' + getRequiredData
      }`,
    });
  }
  async getSalesPDFDashboardAsync(id?: string) {
    let url = `${environment.apiBaseUrl}${ApiUrls.getSalesdashboardpdf}`;
    if (id) {
      url += `/${id}`;
    }
    return await this.restService.fetch<any[]>({
      url: url,
    });
  }
  setData(data: any) {
    this.getRequiredData = data;
  }
  getData() {
    return this.getRequiredData;
  }
}
