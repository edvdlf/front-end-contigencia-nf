import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DashboardProcessamentoDiaDTO, DashboardResumoDTO, DistribuicaoTipoDTO, DivergenciasPorTributoDTO} from '../models/dashboard.model';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient);

  
 
}






