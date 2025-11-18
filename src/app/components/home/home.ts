
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';
import { ProdutosService } from '../../services/produtos.service';
import { Produto } from '../../models/produtos.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  produtos: Produto[] = [];

  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router,
    private produtosService: ProdutosService
  ) {}

  ngOnInit() {
    this.produtosService.listar().subscribe({
      next: data => this.produtos = data.slice(0, 3),
      error: err => console.error('Erro ao carregar produtos:', err)
    });
  }

  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/img/placeholder.png';
  }

  trackByProduto(index: number, produto: Produto): string {
    return produto.id;
  }

  adicionarAoCarrinho(produto: Produto) {
  if (!this.carrinhoService.isLogged()) {
    alert("Faça login para adicionar itens ao carrinho.");
    this.router.navigate(['/login']);
    return;
  }

  this.carrinhoService.adicionar(produto.id, 1).subscribe(() => {
    alert(`${produto.nome} foi adicionado ao carrinho!`);
  });
}


  verDetalhes(produto: Produto) {
    this.router.navigate(['/produto', produto.id]);
  }
}






