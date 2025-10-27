import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css']
})
export class CadastroComponent {
  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';

  constructor(private router: Router) {}

  voltar() {
    this.router.navigate(['/']);
  }

  irParaLogin() {
    this.router.navigate(['/login']);
  }

  onCadastro() {
    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    alert(`Cadastro realizado com sucesso, ${this.nome}!`);
    this.router.navigate(['/login']);
  }
}

