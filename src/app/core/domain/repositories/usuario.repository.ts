import { Observable } from 'rxjs';
import { Usuario, CreateUsuarioDto, UpdateUsuarioDto } from '../entities/usuario.entity';

export abstract class UsuarioRepository {
  abstract getAll(): Observable<Usuario[]>;
  abstract getById(id: string): Observable<Usuario>;
  abstract create(usuario: CreateUsuarioDto): Observable<Usuario>;
  abstract update(id: string, usuario: UpdateUsuarioDto): Observable<Usuario>;
  abstract delete(id: string): Observable<void>;
}