import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Cart } from '../../services/cart';
import { PRODUTOS, Produto } from '../../services/produtos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  produtos = PRODUTOS.slice(0, 3); // mostra apenas 3 destaques

  constructor(private cart: Cart, private router: Router) {}

  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    if (!element.src.includes('placeholder.png')) {
      element.src = 'assets/img/placeholder.png';
    }
  }

  trackByProduto(index: number, produto: Produto): string {
    return produto.id;
  }

  adicionarAoCarrinho(produto: Produto) {
    this.cart.addToCart({
      product: {
        id: produto.id,
        title: produto.nome,
        artist: produto.artista,
        imageUrl: produto.imagem,
        price: produto.preco,
      },
      quantity: 1,
    });
    alert(`${produto.nome} foi adicionado ao carrinho!`);
  }

  verDetalhes(produto: Produto) {
    this.router.navigate(['/produto', produto.id]);
  }
}







