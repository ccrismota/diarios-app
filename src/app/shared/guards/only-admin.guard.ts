import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class OnlyAdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isAdmin.pipe(
      tap((admin) => {
        if (!admin) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
