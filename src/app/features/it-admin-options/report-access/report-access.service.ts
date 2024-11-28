import { Injectable } from '@angular/core';
import { RestService } from 'src/app/shared/services/rest.service';
import { ApiUrls } from 'src/app/shared/utils/esa-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportAccessService {
  constructor(private restService: RestService) {}
  async loadReportAccessAsync() {
    return await this.restService.fetch<any[]>({
      url: `${environment.apiBaseUrl}${ApiUrls.getnewsletters}`,
    });
  }
}
