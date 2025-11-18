// components/login/login.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  voltar() {
    this.router.navigate(['/']);
  }

  onLogin() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, senha } = this.form.value;

    this.usuariosService.login(email!, senha!).subscribe({
      next: users => {
        if (users.length) {
          const usuario = users[0];

          this.authService.login(usuario);

          alert(`Bem-vindo, ${usuario.nome}!`);
          this.router.navigate(['/']);
        } else {
          alert('Usuário ou senha inválidos.');
        }
      },
      error: () => {
        alert('Erro ao efetuar login.');
      }
    });
  }
}
