import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvaluoService } from '../../core/application/services/avaluo.service';
import { Avaluo } from '../../core/domain/entities/avaluo.entity';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avaluos',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    SidebarComponent,
    ButtonComponent
  ],
  templateUrl: './avaluos.component.html',
  styleUrls: ['./avaluos.component.css']
})
export class AvaluosComponent implements OnInit {
  avaluos: Avaluo[] = [];
  loading = false;

  constructor(
    private avaluoService: AvaluoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAvaluos();
  }

  loadAvaluos() {
    this.loading = true;
    this.avaluoService.getAllAvaluos().subscribe({
      next: (data) => {
        this.avaluos = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading avaluos:', error);
        this.loading = false;
      }
    });
  }

  crearAvaluo() {
    this.router.navigate(['/avaluos/crear']);
  }

  verAvaluo(avaluo: Avaluo) {
    const avaluoId = avaluo.id || (avaluo as any)._id;
    if (avaluoId) {
      this.router.navigate(['/avaluos/ver', avaluoId]);
    }
  }

  editarAvaluo(avaluo: Avaluo) {
    const avaluoId = avaluo.id || (avaluo as any)._id;
    if (avaluoId) {
      this.router.navigate(['/avaluos/editar', avaluoId]);
    }
  }
}