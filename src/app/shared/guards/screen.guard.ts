import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
//import { NavigationMenuItemConfig } from '../utils/esa-constants';
import { ProfileDto } from 'src/app/core/types/dto/profileDto';

export const ScreenGuard: CanActivateFn = async (_route) => {
  const profileService = inject(UserService);
  const router = inject(Router);
  let user: ProfileDto | null = profileService.me;
  if (user && !user.email) {
    await profileService.getProfile().then(() => (user = profileService.me));
  }
  // const itemConfig = NavigationMenuItemConfig.find(
  //   (item) =>
  //     item.value.path === state.url || state.url.startsWith(item.value.path)
  // );

 // if (user && user.screens && itemConfig) {
  //const hasAccess = user.screens.some(
  //     (screen: any) =>
  //       screen.name.toLowerCase() === itemConfig.key.toLowerCase()
  //   );

  //   if (hasAccess) {
  //     return true;
  //   }
  // }

  router.navigate(['/access-denied']);
  return false;
};
