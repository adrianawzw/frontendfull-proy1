import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUsuarioCreate } from '../model/IUsuarioCreate';
import { Observable } from 'rxjs';
import { IUsuario } from '../model/IUsuario';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-usuario-form',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.css',
})
export class UsuarioForm implements OnInit {
  usuarios$!: Observable<IUsuario[]>;
  service = inject(UsuarioService);
  router = inject(Router);

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  error = '';

  formUsuario = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
  });

  cargarUsuarios() {
    this.usuarios$ = this.service.getUsuarios();
  }

  guardarUsuario() {
    if (this.formUsuario.invalid) {
      this.error = 'Completar todos los campos';
      return;
    }

    const idValue = parseInt(this.formUsuario.value.id!);

    const usuario: IUsuarioCreate = {
      nombre: this.formUsuario.value.nombre!,
      email: this.formUsuario.value.email!,
      password: this.formUsuario.value.password!,
    };

    let operacion$: Observable<any>;

    if (isNaN(idValue)) {
      operacion$ = this.service.postUsuarios(usuario);
    } else {
      operacion$ = this.service.updateUsuario(idValue, usuario);
    }

    operacion$.subscribe({
      next: () => this.router.navigate(['/usuarios']),
      error: () => (this.error = 'Error al guardar usuario'),
    });
  }

  editarUsuario(data: IUsuario) {
    this.formUsuario.setValue({
      id: data.id!.toString(),
      nombre: data.nombre,
      email: data.email,
      password: '',
    });
  }

  eliminarUsuario(id: number) {
    this.service.deleteUsuario(id).subscribe(() => {
      this.cargarUsuarios();
    });
  }
}
