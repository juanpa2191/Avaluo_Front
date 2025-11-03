import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvaluoRepository } from '../../domain/repositories/avaluo.repository';
import { AvaluoHttpService } from '../../infrastructure/services/avaluo-http.service';
import { Avaluo, CreateAvaluoDto, UpdateAvaluoDto } from '../../domain/entities/avaluo.entity';

@Injectable({
  providedIn: 'root'
})
export class AvaluoService {
  constructor(private avaluoRepository: AvaluoHttpService) {}

  getAllAvaluos(): Observable<Avaluo[]> {
    return this.avaluoRepository.getAll();
  }

  getAvaluoById(id: string): Observable<Avaluo> {
    return this.avaluoRepository.getById(id);
  }

  createAvaluo(avaluo: CreateAvaluoDto): Observable<Avaluo> {
    return this.avaluoRepository.create(avaluo);
  }

  updateAvaluo(id: string, avaluo: UpdateAvaluoDto): Observable<Avaluo> {
    return this.avaluoRepository.update(id, avaluo);
  }

  deleteAvaluo(id: string): Observable<void> {
    return this.avaluoRepository.delete(id);
  }
}