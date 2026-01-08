import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';

import { DashboardProcessamentoDiaDTO, DashboardResumoDTO, DistribuicaoTipoDTO, DivergenciasPorTributoDTO } from '../../models/dashboard.model';
import { SkeletonModule } from 'primeng/skeleton';

import { RouterLink } from '@angular/router';
import { DashboardService } from '../../service/dashboard-service';

@Component({
  standalone: true,
  selector: 'app-dashboard-page',
  imports: [
    CommonModule,
    CardModule,
    TagModule,
    ButtonModule,
    ChartModule,
    SkeletonModule,
   
  ],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})
export class DashboardPage implements OnInit {
  private dashboardService = inject(DashboardService);

  loading = signal<boolean>(true);
  //data = signal<DashboardVisaoGeralDTO | null>(null);

  barData: any;
  barOptions: any;

  dashboardResumo: DashboardResumoDTO | undefined;

  // PrimeNG Chart.js bindings
  barProcessadosData: any;
  barProcessadosOptions: any;

  pieTiposData: any;
  pieTiposOptions: any;

  barTributosData: any;
  barTributosOptions: any;
  totalProcessados: 0 | undefined;

  totalNfe = 0;
  totalNfse = 0;
  totalCte = 0;

  pieData: any;
  pieOptions: any;

  barProcessamentoDiaData: any;
  barProcessamentoDiaOptions: any;

  ngOnInit(): void {
    
  }





}
