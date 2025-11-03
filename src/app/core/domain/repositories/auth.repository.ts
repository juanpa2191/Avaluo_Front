import { Observable } from 'rxjs';
import { LoginDto, RegisterDto, AuthResponse } from '../entities/auth.entity';

export abstract class AuthRepository {
  abstract login(credentials: LoginDto): Observable<AuthResponse>;
  abstract register(userData: RegisterDto): Observable<AuthResponse>;
  abstract logout(): Observable<void>;
}