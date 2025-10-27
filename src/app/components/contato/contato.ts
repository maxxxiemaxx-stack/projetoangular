import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contato.html',
  styleUrls: ['./contato.css']
})
export class ContatoComponent {
  nome: string = '';
  email: string = '';
  mensagem: string = '';

  constructor(private router: Router) {}

  voltar() {
    this.router.navigate(['/']);
  }

  enviarMensagem() {
    if (this.nome && this.email && this.mensagem) {
      alert('Mensagem enviada com sucesso!');
      this.nome = '';
      this.email = '';
      this.mensagem = '';
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }
}
