import { Injectable } from '@angular/core';
import { ApiUrls } from '../../shared/utils/esa-constants';
import { RestService } from 'src/app/shared/services/rest.service';
import { environment } from 'src/environments/environment';
import { ProfileDto } from '../types/dto/profileDto';
import { CommonService } from 'src/app/shared/services/common.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private restService: RestService,
    private commonService: CommonService
  ) {}

  get me(): ProfileDto {
    let cachedData: string = this.commonService.getLocalData('me');
    if (!cachedData) return {} as ProfileDto;
    let profileData = JSON.parse(cachedData) as ProfileDto;
    return profileData;
  }

  public getProfile = async () => {
    let response = await this.restService.fetch<ProfileDto>({
      url: `${environment.apiBaseUrl}${ApiUrls.profile}`,
    });
    if (response.data != null) {
      this.commonService.setLocalData('me', JSON.stringify(response.data));
    }
  };
}
