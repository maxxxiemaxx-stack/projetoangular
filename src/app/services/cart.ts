import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

export interface CartItem {
  product: {
    id: string;
    title: string;
    artist: string;
    imageUrl: string;
    price: number;
  };
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class Cart {
  private readonly STORAGE_KEY = 'cart_items';
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage());
  items$ = this.itemsSubject.asObservable();

  constructor() {

    this.items$.subscribe(items => this.saveToStorage(items));
  }


  get items(): CartItem[] {
    return this.itemsSubject.value;
  }


  getItems(): CartItem[] {
    return [...this.itemsSubject.value];
  }


  addToCart(newItem: CartItem) {
    const items = [...this.itemsSubject.value];
    const existing = items.find(i => i.product.id === newItem.product.id);

    if (existing) {
      existing.quantity += newItem.quantity;
    } else {
      items.push(newItem);
    }

    this.itemsSubject.next(items);
  }


  removeFromCart(id: string) {
    const updated = this.itemsSubject.value.filter(i => i.product.id !== id);
    this.itemsSubject.next(updated);
  }


  updateQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(id);
      return;
    }

    const updated = this.itemsSubject.value.map(i =>
      i.product.id === id ? { ...i, quantity } : i
    );

    this.itemsSubject.next(updated);
  }


  clearCart() {
    this.itemsSubject.next([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }


  get total$() {
    return this.items$.pipe(
      map(items =>
        items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)
      )
    );
  }


  get total(): number {
    return this.items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  }


  private saveToStorage(items: CartItem[]) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Erro ao salvar carrinho no localStorage:', e);
    }
  }

  private loadFromStorage(): CartItem[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }
}
