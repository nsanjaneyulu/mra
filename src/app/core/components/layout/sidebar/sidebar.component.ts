import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ProfileDto } from 'src/app/core/types/dto/profileDto';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { NavigationMenuItemConfig } from 'src/app/shared/utils/esa-constants';
import {
  NavigationEnd,
  Router,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
  LayoutModule,
} from '@angular/cdk/layout';
import { take } from 'rxjs';

@Component({
  selector: 'esa-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    DividerModule,
    ImageModule,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class SidebarComponent implements OnInit {
  public esaMenus: Array<any> = [];
  userProfile!: ProfileDto;
  isExpanded: boolean = false;

  mobileOrientationLandscape: boolean = false;
  nonMenuItemNestedRouteMapping: { routeRegEx: RegExp; mapTo: string }[] = [];
  @Output() flagSignal = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    if (this.esaMenus.length == 0) {
      this.getUserProfile();
    } else {
      this.setMenuItems();
    }
  }

  async getUserProfile() {
    this.setMenuItems();
  }

  setMenuItems() {
    this.esaMenus = [];
    const currentUrl = this.router.url;
    NavigationMenuItemConfig.forEach((screen: any) => {
      const isActive =
        currentUrl.toLowerCase() === screen?.value.path.toLowerCase();
      const menutSetting = this.getMenuEntry(
        isActive ? true : false,
        screen.displayName,
        screen?.value.path!,
        screen?.value.icon,
        screen.displayName
      );
      this.esaMenus.push(menutSetting);
    });
  }

  enableIdx: number = -1;
  disableIdx: number = -1;

  public ngOnInit(): void {
    this.setupRouterEvents();
    this.observeOrientationChanges();
  }

  private setupRouterEvents(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateMenuState(event.urlAfterRedirects);
      }
    });
  }

  private updateMenuState(url: string): void {
    this.updateMenuWithMatchingUrl(url);
    this.updateMenuWithNestedRoutes(url);
    this.updateActiveMenu(url);
  }

  private updateMenuWithMatchingUrl(url: string): void {
    this.esaMenus.forEach((item, index) => {
      const match = item.routerLink.toLowerCase() === url.toLowerCase();
      if (match) {
        this.enableIdx = index;
      } else if (!match && item.isActive) {
        this.disableIdx = index;
      }
    });
  }

  private updateMenuWithNestedRoutes(url: string): void {
    if (!this.esaMenus.some((menuItem) => menuItem.isActive)) {
      this.nonMenuItemNestedRouteMapping.forEach((nestedItem) => {
        if (nestedItem.routeRegEx.test(url)) {
          this.updateMenuWithMatchingUrl(nestedItem.mapTo);
        }
      });
    }
  }

  private updateActiveMenu(url?: any): void {
    const homeRoute = '/dashboard';
    if (url.includes(homeRoute)) {
      this.esaMenus.forEach((menu) => {
        if (menu.routerLink === homeRoute) {
          menu.isActive = true;
        } else {
          menu.isActive = false;
        }
      });
    } else {
      if (this.enableIdx === this.disableIdx) {
        if (this.enableIdx >= 0 && !this.esaMenus[this.enableIdx].isActive) {
          this.esaMenus[this.enableIdx].isActive = true;
        }
      } else {
        if (this.enableIdx >= 0) {
          this.esaMenus[this.enableIdx].isActive = true;
        }
        if (this.disableIdx >= 0) {
          this.esaMenus[this.disableIdx].isActive = false;
        }
      }
    }
  }

  private observeOrientationChanges(): void {
    this.breakpointObserver
      .observe([Breakpoints.HandsetLandscape])
      .subscribe((state: BreakpointState) => {
        this.mobileOrientationLandscape = state.matches;
      });

    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.Handset])
      .pipe(take(1))
      .subscribe((state: BreakpointState) => {
        this.isExpanded = !state.matches;
      });
  }

  public toggleClass() {
    this.isExpanded = !this.isExpanded;

    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.flagSignal.emit(this.isExpanded);
        } else {
          this.flagSignal.emit(false);
        }
      });
  }

  private getMenuEntry(
    isActive: boolean,
    title: string,
    href: string,
    icon?: string,
    tooltip?: string,
    styleClass?: string
  ): MenuItem {
    return {
      title,
      tooltip: tooltip ?? title,
      styleClass: `esa-menu-link ${styleClass}`,
      icon: icon ?? '',
      routerLink: href,
      isActive: isActive,
    } as MenuItem;
  }
}
