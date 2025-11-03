import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvaluoService } from '../../../core/application/services/avaluo.service';
import { Avaluo } from '../../../core/domain/entities/avaluo.entity';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-avaluo',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    TabViewModule,
    SidebarComponent,
    ButtonComponent
  ],
  templateUrl: './ver-avaluo.component.html',
  styleUrls: ['./ver-avaluo.component.css']
})
export class VerAvaluoComponent implements OnInit {
  avaluo: Avaluo | null = null;
  loading = true;
  avaluoId: string = '';

  constructor(
    private avaluoService: AvaluoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.avaluoId = this.route.snapshot.params['id'];
    this.loadAvaluo();
  }

  loadAvaluo() {
    this.avaluoService.getAvaluoById(this.avaluoId).subscribe({
      next: (avaluo) => {
        this.avaluo = avaluo;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading avaluo:', error);
        this.loading = false;
      }
    });
  }

  editarAvaluo() {
    if (this.avaluo) {
      this.router.navigate(['/avaluos/editar', this.avaluoId]);
    }
  }

  volver() {
    this.router.navigate(['/avaluos']);
  }
}