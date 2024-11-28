import { Injectable } from '@angular/core';
import { RestService } from 'src/app/shared/services/rest.service';
import { ApiUrls } from 'src/app/shared/utils/esa-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadNewsletterService {
  constructor(private restService: RestService) {}
  async getNewsletterDataAsync() {
    return await this.restService.fetch<any[]>({
      url: `${environment.apiBaseUrl}${ApiUrls.getnewsletters}`,
    });
  }
  async addNewsletterDataync(addUploadSalesPDFsync?: any) {
    return await this.restService.send<any>({
      url: `${environment.apiBaseUrl}${ApiUrls.uploadNewsLetter}`,
      payload: addUploadSalesPDFsync,
    });
  }

  async deleteNewsLetter(id: any) {
    return await this.restService.delete<any>({
      url: `${environment.apiBaseUrl}${ApiUrls.deleteNewsLetter}/${id}`,
    });
  }
}
