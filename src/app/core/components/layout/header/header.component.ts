import { NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { ProfileDto } from 'src/app/core/types/dto/profileDto';
import { CommonService } from 'src/app/shared/services/common.service';
import { environment } from 'src/environments/environment';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'esa-header',
  standalone: true,
  imports: [NgIf, MenubarModule, MenuModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class HeaderComponent {
  public appTitle: string = '';
  public pageTitle: string = '';
  public userName: string = '';
  public userInitials: string = '';
  public items: Array<MenuItem> = [];
  userProfile: ProfileDto | undefined;

  constructor(
    private commonService: CommonService,
    private authService: AuthenticationService,
    private userService: UserService
  ) {
    this.appTitle = environment.appTitle;

    this.commonService.$pageTitle.subscribe((val) => {
      this.pageTitle = val;
    });

    this.getUserProfile();
  }

  async getUserProfile() {
    this.userProfile = this.userService.me;
    if (this.userProfile && !this.userProfile.email) {
      await this.userService.getProfile().then(() => {
        this.userProfile = this.userService.me;
        this.setupProfileMenu();
      });
    } else {
      this.setupProfileMenu();
    }
  }

  private setupProfileMenu() {
    this.items = [
      {
        label: 'Logout',
        icon: 'esa-icon esa-icon-24 esa-icon-logout',
        command: () => {
          this.authService.logout();
        },
      },
    ];
  }
}
