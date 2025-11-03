import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../core/application/services/usuario.service';
import { Usuario, UpdateUsuarioDto } from '../../../core/domain/entities/usuario.entity';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { MultiSelectComponent } from '../../../shared/components/multi-select/multi-select.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { SelectOption } from '../../../shared/components/select/select.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-usuario',
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
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  loading = true;
  updating = false;
  usuarioId: string = '';

  roleOptions: SelectOption[] = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Usuario', value: 'user' },
    { label: 'Moderador', value: 'moderator' },
    { label: 'Avalúo', value: 'avaluo' }
  ];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      roles: [[], [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit() {
    this.usuarioId = this.route.snapshot.params['id'];
    if (!this.usuarioId) {
      console.error('No se proporcionó ID de usuario');
      this.router.navigate(['/usuarios']);
      return;
    }
    this.loadUsuario();
  }

  loadUsuario() {
    this.usuarioService.getUsuarioById(this.usuarioId).subscribe({
      next: (usuario) => {
        this.usuarioForm.patchValue({
          nombre: usuario.nombre,
          email: usuario.email,
          roles: usuario.roles
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading usuario:', error);
        this.loading = false;
      }
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
    if (this.usuarioForm.valid && this.usuarioForm.dirty) {
      this.updating = true;
      const usuarioData: UpdateUsuarioDto = this.usuarioForm.value;

      this.usuarioService.updateUsuario(this.usuarioId, usuarioData).subscribe({
        next: () => {
          this.router.navigate(['/usuarios']);
        },
        error: (error) => {
          console.error('Error updating usuario:', error);
          this.updating = false;
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/usuarios']);
  }
}