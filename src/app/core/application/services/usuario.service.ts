import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioRepository } from '../../domain/repositories/usuario.repository';
import { UsuarioHttpService } from '../../infrastructure/services/usuario-http.service';
import { Usuario, CreateUsuarioDto, UpdateUsuarioDto } from '../../domain/entities/usuario.entity';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private usuarioRepository: UsuarioHttpService) {}

  getAllUsuarios(): Observable<Usuario[]> {
    return this.usuarioRepository.getAll();
  }

  getUsuarioById(id: string): Observable<Usuario> {
    return this.usuarioRepository.getById(id);
  }

  createUsuario(usuario: CreateUsuarioDto): Observable<Usuario> {
    return this.usuarioRepository.create(usuario);
  }

  updateUsuario(id: string, usuario: UpdateUsuarioDto): Observable<Usuario> {
    return this.usuarioRepository.update(id, usuario);
  }

  deleteUsuario(id: string): Observable<void> {
    return this.usuarioRepository.delete(id);
  }
}