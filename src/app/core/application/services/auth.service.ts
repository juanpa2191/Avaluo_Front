import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthHttpService } from '../../infrastructure/services/auth-http.service';
import { LoginDto, RegisterDto, AuthResponse } from '../../domain/entities/auth.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private authRepository: AuthHttpService) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user && user !== 'undefined') {
      try {
        this.currentUserSubject.next(JSON.parse(user));
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }

  login(credentials: LoginDto): Observable<AuthResponse> {
    return this.authRepository.login(credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      })
    );
  }

  register(userData: RegisterDto): Observable<AuthResponse> {
    return this.authRepository.register(userData).pipe(
      tap(response => {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      })
    );
  }

  logout(): void {
    // Logout inmediato sin depender del backend
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);

    // Opcional: intentar notificar al backend en background
    this.authRepository.logout().subscribe({
      next: () => console.log('Logout backend successful'),
      error: (error) => console.warn('Backend logout failed:', error)
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }
}