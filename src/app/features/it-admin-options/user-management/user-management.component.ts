import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RoleDto } from 'src/app/core/types/dto/roleDto';
import { UserDto } from 'src/app/core/types/dto/user-dto';
import { APIService } from '../../../shared/services/api.service';
import { CommonService } from 'src/app/shared/services/common.service';
// import { UserManagementDto } from './user-management-dto';
import { AppRoles } from 'src/app/shared/types/enums';
interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'esa-user-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    TableModule,
    InputTextModule,
    KeyFilterModule,
    CardModule,
    ButtonModule,
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
})
export class UserManagementComponent implements OnInit {
  tabs: { title: RoleDto; content: UserDto[] }[] = [];
  cols!: Column[];
  employeeIdInput: any;
  emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  constructor(
    private service: APIService,
    private commonService: CommonService
  ) {}

  async ngOnInit() {
    this.service.loadDataAsync().then((response) => {
      if (response.isSuccess && response.data != null) {
        const userManagementList: any[] = response.data;
        for (const mgt of userManagementList) {
          if (mgt?.role.name === AppRoles.RegularEmployee) continue;
          this.tabs.push({
            title: mgt?.role!,
            content: mgt?.users!,
          });
        }
      } else {
        this.commonService.notify('Load data', response.error!, 'error');
      }
    });

    this.cols = [
      { field: 'employeeId', header: 'Employee ID' },
      { field: 'userName', header: 'Employee Name' },
      { field: 'department', header: 'Department' },
    ];
  }

  addUser(roleId: string) {
    if (!this.employeeIdInput && this.employeeIdInput == '') {
      this.commonService.notify(
        'Employee Id',
        'Please enter employee Id to add.',
        'error'
      );
      return;
    }
    if (!this.emailPattern.test(this.employeeIdInput)) {
      this.commonService.notify(
        'Employee Id',
        'Please enter a valid email-id',
        'error'
      );
      return;
    }
    this.service
      .addUserToRoleAsync(roleId, this.employeeIdInput.trim()!)
      .then((response) => {
        if (response.isSuccess) {
          const user: UserDto = response.data!;
          const matchingTab = this.tabs.find(
            (item) => item.title.id === roleId
          );

          if (matchingTab) {
            matchingTab.content.push({
              accountId: user.accountId,
              department: user.department,
              employeeId: user.employeeId,
              userName: user.userName,
              id: user.id,
            });
            this.commonService.notify('Add user', 'User added', 'success');
            setTimeout(() => {
              this.employeeIdInput = "";
            }, 15000);
          }
        }
        else {
          this.employeeIdInput = "";
        }
      });
  }

  askConsentRemoveUser(roleId: string, userId: string) {
    this.commonService.askConsent(
      'Are you sure !',
      'Do you really want to remove the user?',
      () => {
        this.removeUser(roleId, userId);
      }
    );
  }

  removeUser(roleId: string, userId: string) {
    this.service.removeUser(roleId, userId).then((response) => {
      if (response.isSuccess) {
        const user: any = response.data!;
        const matchingTab = this.tabs.find(
          (item) => item.title.id === user.roleId
        );

        if (matchingTab) {
          matchingTab.content = matchingTab.content.filter(
            (x) => x.id != user.userId
          );
          this.commonService.notify('Remove user', 'User removed', 'success');
        } else {
          this.commonService.notify(
            'Remove User',
            `Failed to remove user: ${response.error}`,
            'error'
          );
        }
      }
    });
  }
  //
  activeTabIndexChanged() {
    this.employeeIdInput = '';
  }
}
