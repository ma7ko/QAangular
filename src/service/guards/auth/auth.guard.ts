import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User } from 'src/model/user/User';
import { AuthService } from 'src/service/auth-service/auth.service';

export const authGuard = () => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = sessionStorage.getItem("user");

  if (user) {
    const parsedUser: User = JSON.parse(user);
    const token = parsedUser.accessToken;
    if (token && !authService.isTokenExpired(token)) {
      return true;
    }

    router.navigate(['/login']);
    return false;
  } 
  
  router.navigate(['/login']);
  return false;
};
