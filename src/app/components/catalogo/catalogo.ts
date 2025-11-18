// components/catalogo/catalogo.ts
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Produto } from '../../models/produtos.model';
import { ProdutosService } from '../../services/produtos.service';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class CatalogoComponent {
  produtos: Produto[] = [];

  @ViewChild('carrossel') carrossel!: ElementRef<HTMLDivElement>;

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService,
    private produtosService: ProdutosService
  ) {}

  ngOnInit() {
    this.produtosService.listar().subscribe({
      next: p => this.produtos = p,
      error: err => console.error('Erro ao buscar produtos:', err)
    });
  }

  voltarHome() {
    this.router.navigate(['/']);
  }

  verDetalhes(produto: Produto) {
    this.router.navigate(['/produto', produto.id]);
  }

 adicionarAoCarrinho(produto: Produto) {
  if (!this.carrinhoService.isLogged()) {
    alert("Você precisa estar logado para adicionar produtos ao carrinho.");
    this.router.navigate(['/login']);
    return;
  }

  this.carrinhoService.adicionar(produto.id, 1).subscribe(() => {
    alert(`${produto.nome} foi adicionado ao carrinho!`);
  });
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
