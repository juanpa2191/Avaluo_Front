export interface Usuario {
  id?: string;
  nombre: string;
  email: string;
  password?: string;
  roles: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUsuarioDto {
  nombre: string;
  email: string;
  password: string;
  roles: string[];
}

export interface UpdateUsuarioDto {
  nombre?: string;
  email?: string;
  roles?: string[];
}