import { Injectable } from '@angular/core';
import { RestService } from 'src/app/shared/services/rest.service';
import { ApiUrls } from 'src/app/shared/utils/esa-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PublishedNewsService {
  constructor(private restService: RestService) {}
  async loadPublishedNewsAsync() {
    return await this.restService.fetch<any[]>({
      url: `${environment.apiBaseUrl}${ApiUrls.getnewsletters}`,
    });
  }
}
