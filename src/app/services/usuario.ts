import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUsuario } from '../usuarios/model/IUsuario';
import { IUsuarioCreate } from '../usuarios/model/IUsuarioCreate';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private URL = `${environment.URL}/api/usuarios`;
  private http = inject(HttpClient);

  getUsuarios() {
    return this.http.get<IUsuario[]>(this.URL);
  }

  postUsuarios(data: IUsuarioCreate) {
    return this.http.post<IUsuario>(this.URL, data);
  }

  deleteUsuario(id: number) {
    return this.http.delete(`${this.URL}/${id}`);
  }

  updateUsuario(id: number, data: IUsuarioCreate) {
    return this.http.put<IUsuario>(`${this.URL}/${id}`, data);
  }

  loginUsuario(email: string, password: string) {
    return this.http.post(`${this.URL}/login`, {
      email,
      password,
    });
  }
}
