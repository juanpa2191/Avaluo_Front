import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AvaluoRepository } from '../../domain/repositories/avaluo.repository';
import { Avaluo, CreateAvaluoDto, UpdateAvaluoDto } from '../../domain/entities/avaluo.entity';

@Injectable({
  providedIn: 'root'
})
export class AvaluoHttpService implements AvaluoRepository {
  private apiUrl = `${environment.apiUrl}/avaluo`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Avaluo[]> {
    return this.http.get<Avaluo[]>(this.apiUrl);
  }

  getById(id: string): Observable<Avaluo> {
    return this.http.get<Avaluo>(`${this.apiUrl}/${id}`);
  }

  create(avaluo: CreateAvaluoDto): Observable<Avaluo> {
    return this.http.post<Avaluo>(this.apiUrl, avaluo);
  }

  update(id: string, avaluo: UpdateAvaluoDto): Observable<Avaluo> {
    return this.http.patch<Avaluo>(`${this.apiUrl}/${id}`, avaluo);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}