import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { IUsuario } from '../model/IUsuario';
import { UsuarioService } from '../../services/usuario';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-usuario-list',
  imports: [ReactiveFormsModule, RouterLink, AsyncPipe],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.css',
})
export class UsuarioList implements OnInit{
  usuarios$!: Observable<IUsuario[]>;
  service = inject(UsuarioService);

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarios$ = this.service.getUsuarios();
  }

  eliminarUsuario(id: number){
    this.service.deleteUsuario(id).subscribe(()=>{
      this.cargarUsuarios();
    });
  }

}
