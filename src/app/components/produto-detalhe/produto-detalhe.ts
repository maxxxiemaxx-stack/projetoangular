import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PRODUTOS, Produto } from '../../services/produtos';
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-produto-detalhe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produto-detalhe.html',
  styleUrls: ['./produto-detalhe.css']
})
export class ProdutoDetalheComponent {
  produto?: Produto;
  quantidade: number = 1;

  constructor(
    private route: ActivatedRoute,
    private cartService: Cart,
    private router: Router
  ) {}

  ngOnInit() {

    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;


    const id = isNaN(Number(idParam)) ? idParam : Number(idParam);


    this.produto = PRODUTOS.find(p => p.id === id);

    if (!this.produto) {
      console.error('Produto não encontrado:', idParam);
      this.router.navigate(['/catalogo']);
    }
  }

  adicionarAoCarrinho() {
    if (!this.produto) return;

    this.cartService.addToCart({
      product: {
        id: this.produto.id,
        title: this.produto.nome,
        artist: this.produto.artista,
        imageUrl: this.produto.imagem,
        price: this.produto.preco
      },
      quantity: this.quantidade
    });

    alert(`${this.produto.nome} foi adicionado ao carrinho!`);
  }

  voltarHome() {

    if (window.history.length > 1) {
      this.router.navigateByUrl('/catalogo');
    } else {
      this.router.navigate(['/']);
    }
  }
}
