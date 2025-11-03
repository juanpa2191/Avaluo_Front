import { Component, OnInit } from '@angular/core';
import { AvaluoService } from '../../core/application/services/avaluo.service';
import { Avaluo } from '../../core/domain/entities/avaluo.entity';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avaluos',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    SidebarComponent
  ],
  templateUrl: './avaluos.component.html',
  styleUrls: ['./avaluos.component.css']
})
export class AvaluosComponent implements OnInit {
  avaluos: Avaluo[] = [];
  loading = false;

  constructor(private avaluoService: AvaluoService) {}

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
}