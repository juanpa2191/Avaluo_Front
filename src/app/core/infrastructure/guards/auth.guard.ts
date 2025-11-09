import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../application/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated() && !this.authService.isTokenExpiringSoon()) {
      return true;
    } else {
      // Si no está autenticado o el token está por expirar, redirigir a login
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
    }
  }
}