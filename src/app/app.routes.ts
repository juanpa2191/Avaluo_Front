import { Routes } from '@angular/router';
import { AuthGuard } from './core/infrastructure/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./features/usuarios/usuarios.component').then(m => m.UsuariosComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios/crear',
    loadComponent: () => import('./features/usuarios/crear-usuario/crear-usuario.component').then(m => m.CrearUsuarioComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios/editar/:id',
    loadComponent: () => import('./features/usuarios/editar-usuario/editar-usuario.component').then(m => m.EditarUsuarioComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'avaluos',
    loadComponent: () => import('./features/avaluos/avaluos.component').then(m => m.AvaluosComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'avaluos/crear',
    loadComponent: () => import('./features/avaluos/crear-avaluo/crear-avaluo.component').then(m => m.CrearAvaluoComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'avaluos/ver/:id',
    loadComponent: () => import('./features/avaluos/ver-avaluo/ver-avaluo.component').then(m => m.VerAvaluoComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'avaluos/editar/:id',
    loadComponent: () => import('./features/avaluos/editar-avaluo/editar-avaluo.component').then(m => m.EditarAvaluoComponent),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
