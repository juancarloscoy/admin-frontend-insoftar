import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  public url = environment.url;

  getUsuarios() {
    return this.http.get(this.url);
  }

  guardarUsuario(usuario: Usuario): any {

    return this.http.post(this.url, usuario);
  }

  actualizarUsuario(id: string, usuario: Usuario) {
    delete usuario._id;

    return this.http.put(`${this.url}/${id}`, usuario);
  }

}


