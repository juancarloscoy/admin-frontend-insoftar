import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-reactive-user',
  templateUrl: './form-reactive-user.component.html',
  styleUrls: ['./form-reactive-user.component.css']
})
export class FormReactiveUserComponent implements OnInit {

  public formSubmitted = false;
  public listUsuarios: Usuario[];
  public usuario: Usuario = new Usuario();

  public registerForm = this.fb.group({
    nombres: ['', Validators.required],
    apellidos: [''],
    cedula: [''],
    correo: ['', [Validators.required, Validators.email]],
    telefono: [''],
    id: ['']
  });

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(
      (usuarios: any) => {
        this.listUsuarios = usuarios.usuarios;
      }
    );
  }

  guardarUsuario(): any {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    if (this.registerForm.get(['id']).value) {
      this.usuarioService.actualizarUsuario(this.registerForm.get(['id']).value, this.registerForm.value).subscribe((res: any) => {
        this.usuario = res.usuario;
        this.listUsuarios = this.listUsuarios.map(usuario => {
          if (usuario._id === this.usuario._id) {
            return {
              ...usuario,
              nombres: this.usuario.nombres,
              apellidos: this.usuario.apellidos,
              cedula: this.usuario.cedula,
              correo: this.usuario.correo,
              telefono: this.usuario.telefono
            };
          } else {
            return usuario;
          }
        });
        Swal.fire('Succes', 'Usuario actualizado correctamente', 'success');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
    } else {
      this.usuarioService.guardarUsuario(this.registerForm.value).subscribe((res: any) => {
        this.usuario = res.usuario;
        this.listUsuarios.push(this.usuario);
        Swal.fire('Succes', 'Usuario insertado correctamente', 'success');
      }, (err) => {
        console.log(err);
        Swal.fire('Error', err.error.msg, 'error');
      });
    }
  }

  campoInvalido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  cargarUsuario(usuario: any): any {
    this.registerForm.controls['nombres'].setValue(usuario['nombres']);
    this.registerForm.controls['apellidos'].setValue(usuario['apellidos']);
    this.registerForm.controls['cedula'].setValue(usuario['cedula']);
    this.registerForm.controls['correo'].setValue(usuario['correo']);
    this.registerForm.controls['telefono'].setValue(usuario['telefono']);
    this.registerForm.controls['id'].setValue(usuario['_id']);
  }

  cleanForm() {
    this.registerForm.reset();
  }

}
