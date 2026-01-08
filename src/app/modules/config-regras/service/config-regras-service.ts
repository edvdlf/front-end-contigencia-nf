import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigRegrasService {

  

  apiUrl: string = `${environment.backendUrl}/regras`;

    constructor(private http: HttpClient) { }

    salvar(regra: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, regra);
    }

   salvarCondicao(condicao: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/condicoes`, condicao);
    }

    listar() {
        let searchParams = new HttpParams();
        return this.http.get<any[]>(`${this.apiUrl}`,
            { params: searchParams });
    }

    listarColunas() {
        let searchParams = new HttpParams();
        return this.http.get<any[]>(`${this.apiUrl}/colunas`,
            { params: searchParams });
    }

    listaCondicoes(regra: any) {
        let searchParams = new HttpParams();
        return this.http.get<any[]>(`${this.apiUrl}/condicoes/${regra.id}`,
            { params: searchParams });
    }

    deletar(regra: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${regra.id}`);
    }

    deletarCondicao(condicao: any): Observable<any> {
        return this.http.delete(`${this.apiUrl}/condicoes/${condicao.id}`);
    }


  
}
