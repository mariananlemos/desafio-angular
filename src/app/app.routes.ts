import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent, title: 'Produtos | FakeStore' },
  { path: 'wishlist', component: WishlistComponent, title: 'Wishlist ❤️ | FakeStore' },
  // Rota reservada para a Pessoa 2 implementar a tela de Detalhes do Produto:
  // { path: 'produto/:id', component: ProductDetailComponent, title: 'Detalhes do Produto' },
  { path: '**', redirectTo: '' }
];
