import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarrinhoService, CarrinhoItem } from '../../services/carrinho.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './carrinho.html',
  styleUrls: ['./carrinho.css'],
})
export class CarrinhoComponent implements OnInit {

  itens: CarrinhoItem[] = [];
  subtotal = 0;
  total = 0;

  constructor(
    private carrinhoService: CarrinhoService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.carregarCarrinho();
  }

  carregarCarrinho() {
    const userId = this.authService.userId;
    if (!userId) return;

    this.carrinhoService.carregarCarrinho();

    this.carrinhoService.items$.subscribe(items => {
      this.itens = items;
      this.atualizarTotal();
    });
  }

  atualizarTotal() {
    this.subtotal = this.itens.reduce(
      (acc, item) => acc + (item.quantity * 1),
      0
    );
    this.total = this.subtotal;
  }

  atualizarQuantidade(item: CarrinhoItem, event: Event) {
    const novaQtd = +(event.target as HTMLInputElement).value;

    this.carrinhoService.atualizarQuantidade(item.id!, novaQtd).subscribe({
      next: () => this.carregarCarrinho(),
      error: err => console.error('Erro ao atualizar quantidade:', err)
    });
  }

  removerItem(item: CarrinhoItem) {
    this.carrinhoService.removerItem(item.id!).subscribe({
      next: () => this.carregarCarrinho(),
      error: err => console.error('Erro ao remover item:', err)
    });
  }

  limparCarrinho() {
    const userId = this.authService.userId;
    if (!userId) return;

    this.carrinhoService.limparPorUsuario(userId).subscribe({
      next: () => this.carregarCarrinho(),
      error: err => console.error('Erro ao limpar o carrinho:', err)
    });
  }
}


