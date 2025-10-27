import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(private router: Router) {}

  onLogin() {
    if (!this.email || !this.senha) {
      alert('Preencha todos os campos!');
      return;
    }
    alert(`Bem-vindo, ${this.email}!`);
    this.router.navigate(['/']);
  }

  irParaCadastro() {
  this.router.navigate(['/cadastro']);
}

  voltar() {
    this.router.navigate(['/']);
  }
}


