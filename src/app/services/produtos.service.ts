import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../models/produtos.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProdutosService {
  private api = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.api);
  }

  buscar(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.api}/${id}`);
  }

  criar(prod: Produto) {
    return this.http.post<Produto>(this.api, prod);
  }

  atualizar(id: string, prod: Produto) {
    return this.http.put<Produto>(`${this.api}/${id}`, prod);
  }

  excluir(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
