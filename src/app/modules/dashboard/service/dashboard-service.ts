import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DashboardProcessamentoDiaDTO, DashboardResumoDTO, DistribuicaoTipoDTO, DivergenciasPorTributoDTO} from '../models/dashboard.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient);

   apiUrl: string = `${environment.backendUrl}/regras`;
  
     


  getDashboardResumo(): Observable<DashboardResumoDTO> {
    console.log("Monitorando url no service")
    const url = `${this.apiUrl}/resumo`;
    return this.http.get<DashboardResumoDTO>(url);
  }
  
 
}






