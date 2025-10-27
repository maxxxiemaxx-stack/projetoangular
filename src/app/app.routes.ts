import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home').then(m => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login').then(m => m.LoginComponent),
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./components/cadastro/cadastro').then(m => m.CadastroComponent),
  },
  {
    path: 'contato',
    loadComponent: () =>
      import('./components/contato/contato').then(m => m.ContatoComponent),
  },
  {
    path: 'carrinho',
    loadComponent: () =>
      import('./components/carrinho/carrinho').then(m => m.CarrinhoComponent),
  },
  {
    path: 'produto/:id',
    loadComponent: () =>
      import('./components/produto-detalhe/produto-detalhe').then(
        m => m.ProdutoDetalheComponent
      ),
  },
  {
  path: 'catalogo',
  loadComponent: () =>
    import('./components/catalogo/catalogo').then(m => m.CatalogoComponent),
},
  {
    path: '**',
    redirectTo: '',
  },
];
