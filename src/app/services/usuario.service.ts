import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }


  getUsuarios() {

    return this.http.get('http://localhost:3000/api/usuarios');
  }

  guardarUsuario(usuario: Usuario) {

    return this.http.post('http://localhost:3000/api/usuarios', usuario);
  }

  actualizarUsuario(id: string, usuario: Usuario) {
    delete usuario._id;

    return this.http.put(`http://localhost:3000/api/usuarios/${id}`, usuario);
  }

}


