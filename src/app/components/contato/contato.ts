
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contato.html',
  styleUrls: ['./contato.css']
})
export class ContatoComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private contatoService: ContatoService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensagem: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  voltar() {
    this.router.navigate(['/']);
  }

  enviarMensagem() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.contatoService.enviar(this.form.value).subscribe({
      next: () => {
        alert('Mensagem enviada com sucesso!');
        this.form.reset();
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao enviar mensagem.');
      }
    });
  }
}


