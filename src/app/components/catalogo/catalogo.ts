import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Produto, PRODUTOS } from '../../services/produtos';
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class CatalogoComponent {
  produtos: Produto[] = PRODUTOS;

  @ViewChild('carrossel') carrossel!: ElementRef<HTMLDivElement>;

  constructor(private router: Router, private cartService: Cart) {}

  voltarHome() {
    this.router.navigate(['/']);
  }

  verDetalhes(produto: Produto) {
    this.router.navigate(['/produto', produto.id]);
  }

  adicionarAoCarrinho(produto: Produto) {
    this.cartService.addToCart({
      product: {
        id: produto.id,
        title: produto.nome,
        artist: produto.artista,
        imageUrl: produto.imagem,
        price: produto.preco
      },
      quantity: 1
    });
    alert(`${produto.nome} foi adicionado ao carrinho!`);
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/img/placeholder-vinil.png';
  }

  trackByProduto(index: number, produto: Produto) {
    return produto.id;
  }

  scrollEsquerda() {
    this.carrossel.nativeElement.scrollBy({ left: -400, behavior: 'smooth' });
  }

  scrollDireita() {
    this.carrossel.nativeElement.scrollBy({ left: 400, behavior: 'smooth' });
  }
}


