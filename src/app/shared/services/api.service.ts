import { Injectable } from '@angular/core';
// import { UserManagementDto } from './user-management-dto';
import { RestService } from 'src/app/shared/services/rest.service';
import { ApiUrls } from 'src/app/shared/utils/esa-constants';
import { environment } from 'src/environments/environment';
import { UserDto } from '../../core/types/dto/user-dto';
// import { RemoveUserDto } from './remove-dto';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  public getRequiredData: any;
  constructor(private restService: RestService) {}

  async loadDataAsync() {
    return await this.restService.fetch<any[]>({
      url: `${environment.apiBaseUrl}${ApiUrls.usermanagement}`,
    });
  }
  async loadUploadSalesPDFAsync() {
    return await this.restService.fetch<any[]>({
      url: `${environment.apiBaseUrl}${ApiUrls.getnewsletters}`,
    });
  }
  async loadSalesPDFDashboardAsync(id?: string) {
    let url = `${environment.apiBaseUrl}${ApiUrls.getSalesdashboardpdf}`;
    console.log(id);
    if (id) {
      url += `/${id}`;
    }
    return await this.restService.fetch<any[]>({
      url: url,
    });
  }
  async loadgetnewsletterpdfAsync(getRequiredData?: any) {
    console.log("getRequiredData", getRequiredData);
    return await this.restService.fetch<any[]>({
      url: `${environment.apiBaseUrl}${
        ApiUrls.getnewsletterpdf + '/' + getRequiredData
      }`,
    });
  }

  async addUserToRoleAsync(roleId: string, emailId: string) {
    return await this.restService.send<UserDto>({
      url: `${environment.apiBaseUrl}${ApiUrls.addUserToRole}`,
      payload: {
        emailId: emailId,
        roleId: roleId,
      },
    });
  }

  async addUploadSalesPDFsync(addUploadSalesPDFsync?: any) {
    return await this.restService.send<any>({
      url: `${environment.apiBaseUrl}${ApiUrls.addUploadSalesDashboard}`,
      payload: {
        date: addUploadSalesPDFsync.date,
        pdfName: addUploadSalesPDFsync.pdfName,
        file: {
          name: addUploadSalesPDFsync.file.name,
          lastModified: addUploadSalesPDFsync.file.lastModified,
          lastModifiedDate: addUploadSalesPDFsync.file.lastModifiedDate,
          size: addUploadSalesPDFsync.file.size,
        },
      },
    });
  }
  //
  async removeUser(roleId: string, userId: string) {
    return await this.restService.send<any>({
      url: `${environment.apiBaseUrl}${ApiUrls.deleteUserRole}`,
      payload: {
        userId: userId,
        roleId: roleId,
      },
    });
  }
  setData(data: any) {
    this.getRequiredData = data;
  }

  getData() {
    return this.getRequiredData;
  }
}
