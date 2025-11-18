import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from './auth.service';

export interface CarrinhoItem {
  id?: string;
  userId: string;
  productId: string;
  quantity: number;
  product?: any;
}

@Injectable({ providedIn: 'root' })
export class CarrinhoService {

  private api = 'http://localhost:3000/carrinho';

  private itemsSubject = new BehaviorSubject<CarrinhoItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  carregarCarrinho(): void {
    const userId = this.auth.userId;
    if (!userId) {
      this.itemsSubject.next([]);
      return;
    }

    this.http.get<CarrinhoItem[]>(`${this.api}?userId=${userId}`)
      .pipe(
        switchMap(items => {
          if (items.length === 0) {
            this.itemsSubject.next([]);
            return of([]);
          }

          return forkJoin(
            items.map(item =>
              this.http.get(`http://localhost:3000/produtos/${item.productId}`)
                .pipe(
                  tap(prod => item.product = prod)
                )
            )
          ).pipe(
            tap(() => this.itemsSubject.next(items))
          );
        })
      )
      .subscribe();
  }

  adicionar(productId: string, quantity: number): Observable<any> {
    const userId = this.auth.userId!;

    return this.http.post<CarrinhoItem>(this.api, { userId, productId, quantity })
      .pipe(
        tap(() => this.carregarCarrinho())
      );
  }

  atualizarQuantidade(id: string, quantity: number): Observable<any> {
    return this.http.patch(`${this.api}/${id}`, { quantity })
      .pipe(
        tap(() => this.carregarCarrinho())
      );
  }

  removerItem(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`)
      .pipe(
        tap(() => this.carregarCarrinho())
      );
  }

  limparPorUsuario(userId: string): Observable<any> {
    return this.http.get<CarrinhoItem[]>(`${this.api}?userId=${userId}`)
      .pipe(
        switchMap(items => {
          if (!items.length) return of([]);

          return forkJoin(
            items.map(i => this.http.delete(`${this.api}/${i.id}`))
          );
        }),
        tap(() => this.carregarCarrinho())
      );
  }
  isLogged(): boolean {
  return this.auth.isLogged();
}

}


