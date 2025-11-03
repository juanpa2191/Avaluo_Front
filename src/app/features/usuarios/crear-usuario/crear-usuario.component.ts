import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../core/application/services/usuario.service';
import { CreateUsuarioDto } from '../../../core/domain/entities/usuario.entity';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { MultiSelectComponent } from '../../../shared/components/multi-select/multi-select.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { SelectOption } from '../../../shared/components/select/select.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    SidebarComponent,
    InputComponent,
    MultiSelectComponent,
    ButtonComponent
  ],
  templateUrl: './crear-usuario.component.html',
  styles: [`
    .usuarios-container {
      display: flex;
      min-height: 100vh;
      background: #f5f5f5;
    }

    .main-content {
      flex: 1;
      margin-left: 250px;
      transition: margin-left 0.3s ease;
    }

    .page-header {
      background: white;
      padding: 20px 30px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .page-header h1 {
      margin: 0;
      color: #333;
      font-weight: 600;
    }

    .content {
      padding: 30px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 30px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .main-content {
        margin-left: 0;
      }

      .page-header {
        flex-direction: column;
        gap: 15px;
        text-align: center;
      }

      .form-grid {
        grid-template-columns: 1fr;
        gap: 15px;
      }
    }
  `]
})
export class CrearUsuarioComponent {
  usuarioForm: FormGroup;
  loading = false;

  roleOptions: SelectOption[] = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Usuario', value: 'user' },
    { label: 'Moderador', value: 'moderator' },
    { label: 'Avalúo', value: 'avaluo' }
  ];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: [[], [Validators.required, Validators.minLength(1)]]
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.usuarioForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (field?.hasError('email')) {
      return 'Ingrese un email válido';
    }
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength']?.requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    return '';
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      this.loading = true;
      const usuarioData: CreateUsuarioDto = this.usuarioForm.value;

      this.usuarioService.createUsuario(usuarioData).subscribe({
        next: () => {
          this.router.navigate(['/usuarios']);
        },
        error: (error) => {
          console.error('Error creating usuario:', error);
          this.loading = false;
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/usuarios']);
  }
}