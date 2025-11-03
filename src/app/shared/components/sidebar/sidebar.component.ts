import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard'
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-users',
      routerLink: '/usuarios'
    },
    {
      label: 'Avaluos',
      icon: 'pi pi-building',
      routerLink: '/avaluos'
    }
  ];

  constructor(private router: Router) {}

  isActive(routerLink: string): boolean {
    return this.router.url === routerLink;
  }
}