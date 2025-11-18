// components/produto-detalhe/produto-detalhe.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from '../../services/produtos.service';
import { Produto } from '../../models/produtos.model';
import { CarrinhoService } from '../../services/carrinho.service';

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
    private produtosService: ProdutosService,
    private carrinhoService: CarrinhoService,
    private router: Router
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.router.navigate(['/catalogo']);
      return;
    }

    this.produtosService.buscar(idParam).subscribe({
      next: p => this.produto = p,
      error: err => {
        console.error('Produto não encontrado:', err);
        this.router.navigate(['/catalogo']);
      }
    });
  }

  adicionarAoCarrinho() {
  if (!this.carrinhoService.isLogged()) {
    alert("Você precisa estar logado para adicionar ao carrinho.");
    this.router.navigate(['/login']);
    return;
  }

  this.carrinhoService.adicionar(this.produto!.id, this.quantidade)
    .subscribe(() => {
      alert(`${this.produto!.nome} foi adicionado ao carrinho!`);
    });
}


  voltarHome() {
    this.router.navigateByUrl('/catalogo');
  }
}

