export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  nombre: string;
  email: string;
  password: string;
  roles: string[];
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    nombre: string;
    email: string;
    roles: string[];
  };
}