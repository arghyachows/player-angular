import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, SignupRequest } from '../interfaces/auth.interface';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly API_URL = 'https://player-backend.vercel.app/';
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        this.checkAuthStatus();
    }

    private checkAuthStatus() {
        const token = this.getToken();
        if (token) {
            // Update authentication state based on token presence
            this.isAuthenticatedSubject.next(true);
        } else {
            this.isAuthenticatedSubject.next(false);
            this.router.navigate(['/login']);
        }
    }

    signup(data: SignupRequest): Observable<any> {
        return this.http.post(`${this.API_URL}/signup`, data);
    }

    login(data: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.API_URL}/token`, data).pipe(
            tap(response => {
                // Store token without 'Bearer' prefix - it's added by the interceptor
                localStorage.setItem('token', response.access_token);
                this.isAuthenticatedSubject.next(true);
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        const token = localStorage.getItem('token');
        return token;
    }
} 