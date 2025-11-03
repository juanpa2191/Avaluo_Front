import { Observable } from 'rxjs';
import { Avaluo, CreateAvaluoDto, UpdateAvaluoDto } from '../entities/avaluo.entity';

export abstract class AvaluoRepository {
  abstract getAll(): Observable<Avaluo[]>;
  abstract getById(id: string): Observable<Avaluo>;
  abstract create(avaluo: CreateAvaluoDto): Observable<Avaluo>;
  abstract update(id: string, avaluo: UpdateAvaluoDto): Observable<Avaluo>;
  abstract delete(id: string): Observable<void>;
}