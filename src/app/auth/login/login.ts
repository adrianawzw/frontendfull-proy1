import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  router = inject(Router)
  service = inject(UsuarioService);

  error = '';

  formLogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  login(){
    const email = this.formLogin.value.email!;
    const password = this.formLogin.value.password!;

    this.service.loginUsuario(email, password).subscribe({
      next: () => {
        this.router.navigate(['/usuarios']);
      },
      error: err => {
        if (err.status === 401) {
          this.error = 'Credenciales incorrectas';
        }
      }
    });
  }
}
