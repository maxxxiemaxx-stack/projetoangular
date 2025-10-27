import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Cart, CartItem } from '../../services/cart';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './carrinho.html',
  styleUrls: ['./carrinho.css'],
})
export class CarrinhoComponent implements OnInit {
  itens: CartItem[] = [];
  subtotal = 0;
  total = 0;

  constructor(private cart: Cart) {}

  ngOnInit() {

    this.itens = this.cart.getItems();
    this.atualizarTotal();
  }

  atualizarTotal() {
    this.subtotal = this.itens.reduce(
      (acc, i) => acc + i.product.price * i.quantity,
      0
    );
    this.total = this.subtotal;
  }

  removerItem(item: CartItem) {
    this.cart.removeFromCart(item.product.id);
    this.itens = this.cart.getItems();
    this.atualizarTotal();
  }

  atualizarQuantidade(item: CartItem, event: Event) {
    const novaQtd = +(event.target as HTMLInputElement).value;
    this.cart.updateQuantity(item.product.id, novaQtd);
    this.itens = this.cart.getItems();
    this.atualizarTotal();
  }

  limparCarrinho() {
    this.cart.clearCart();
    this.itens = [];
    this.atualizarTotal();
  }
}

