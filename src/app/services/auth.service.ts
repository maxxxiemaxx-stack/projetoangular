import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly KEY = 'usuario_logado';

  private userSubject = new BehaviorSubject<Usuario | null>(this.getUserFromStorage());
  user$ = this.userSubject.asObservable();

  constructor() {}

  private getUserFromStorage(): Usuario | null {
    try {
      const data = localStorage.getItem(this.KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      console.warn('Erro ao ler localStorage: usuário deslogado.');
      return null;
    }
  }

  login(usuario: Usuario): void {
    localStorage.setItem(this.KEY, JSON.stringify(usuario));
    this.userSubject.next(usuario);
  }

  logout(): void {
    localStorage.removeItem(this.KEY);
    this.userSubject.next(null);
  }

  get user(): Usuario | null {
    return this.userSubject.value;
  }

  get userId(): string | undefined {
    return this.user?.id;
  }

  isLogged(): boolean {
    return !!this.user;
  }
}

