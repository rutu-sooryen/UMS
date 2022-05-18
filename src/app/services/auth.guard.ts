import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    let isauthenticated = localStorage.getItem('isAuthenticated');
    if (isauthenticated != 'true') {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
