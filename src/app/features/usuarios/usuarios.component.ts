import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../core/application/services/usuario.service';
import { Usuario } from '../../core/domain/entities/usuario.entity';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    SidebarComponent,
    DatePipe
  ],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  loading = false;

  constructor(private usuarioService: UsuarioService) {}

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
}