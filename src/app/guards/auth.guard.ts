import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.isAuthenticated$.pipe(
        map(isAuthenticated => {
            if (!isAuthenticated) {
                router.navigate(['/login']);
                return false;
            }
            return true;
        })
    );
}; 