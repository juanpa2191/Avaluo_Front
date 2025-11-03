import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../core/application/services/usuario.service';
import { Usuario } from '../../core/domain/entities/usuario.entity';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    SidebarComponent,
    ConfirmDialogComponent,
    ButtonComponent,
    DatePipe
  ],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  loading = false;
  showConfirmDialog = false;
  usuarioToDelete: Usuario | null = null;
  deleting = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.loading = true;
    this.usuarioService.getAllUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading usuarios:', error);
        this.loading = false;
      }
    });
  }

  crearUsuario() {
    this.router.navigate(['/usuarios/crear']);
  }

  editarUsuario(usuario: Usuario) {
    this.router.navigate(['/usuarios/editar', usuario.id]);
  }

  confirmarEliminarUsuario(usuario: Usuario) {
    this.usuarioToDelete = usuario;
    this.showConfirmDialog = true;
  }

  eliminarUsuario() {
    if (this.usuarioToDelete) {
      this.deleting = true;
      this.usuarioService.deleteUsuario(this.usuarioToDelete.id!).subscribe({
        next: () => {
          this.usuarios = this.usuarios.filter(u => u.id !== this.usuarioToDelete!.id);
          this.showConfirmDialog = false;
          this.usuarioToDelete = null;
          this.deleting = false;
        },
        error: (error) => {
          console.error('Error deleting usuario:', error);
          this.deleting = false;
        }
      });
    }
  }

  cancelarEliminacion() {
    this.showConfirmDialog = false;
    this.usuarioToDelete = null;
  }
}