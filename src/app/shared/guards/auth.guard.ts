
import { Router, CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../../core/services/auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (_route, _state) => {
  let _service: AuthenticationService = inject(AuthenticationService);
  let _router: Router = inject(Router);

  if (_service.isAuthenticated()) {
    return true;
  } else {
    return _router.navigate(['/']);
  }
};
