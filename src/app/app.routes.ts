import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { UsuarioList } from './usuarios/usuario-list/usuario-list';
import { UsuarioForm } from './usuarios/usuario-form/usuario-form';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'usuarios', component: UsuarioList },
  { path: 'usuarios/nuevo', component: UsuarioForm },
];
