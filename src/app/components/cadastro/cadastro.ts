import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css']
})
export class CadastroComponent implements OnInit {

  form!: FormGroup<{ [key: string]: any }>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        nome: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', Validators.required]
      },
      { validators: this.senhasIguais }
    );
  }

  voltar() {
    this.router.navigate(['/']);
  }

  senhasIguais(form: FormGroup) {
    const senha = form.get('senha')?.value;
    const confirmar = form.get('confirmarSenha')?.value;
    return senha === confirmar ? null : { senhasDiferentes: true };
  }

  onCadastro() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { confirmarSenha, nome, email, senha } = this.form.value;

    const payload: Usuario = {
      nome: nome!,
      email: email!,
      senha: senha!
    };

    this.usuariosService.cadastrar(payload).subscribe({
      next: () => {
        alert(`Cadastro realizado com sucesso, ${payload.nome}!`);
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Erro ao cadastrar. Tente novamente.');
      }
    });
  }

  irParaLogin() {
    this.router.navigate(['/login']);
  }
}
