import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  login(email: string, senha: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}&senha=${senha}`);
  }

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }
}
