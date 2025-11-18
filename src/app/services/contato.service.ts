// src/app/services/contato.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Mensagem {
  id?: number;
  nome: string;
  email: string;
  mensagem: string;
  criadoEm?: string;
}

@Injectable({ providedIn: 'root' })
export class ContatoService {
  private api = 'http://localhost:3000/mensagens';

  constructor(private http: HttpClient) {}

  enviar(m: Mensagem): Observable<Mensagem> {
    const payload = { ...m, criadoEm: new Date().toISOString() };
    return this.http.post<Mensagem>(this.api, payload);
  }

  listar(): Observable<Mensagem[]> {
    return this.http.get<Mensagem[]>(this.api);
  }
}
