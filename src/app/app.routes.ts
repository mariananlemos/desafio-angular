import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProductDetail } from './components/product-detail/product-detail.component';
//import { CartListComponent } from './components/cartlist/cartlist.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent, title: 'Produtos | FakeStore' },
  { path: 'wishlist', component: WishlistComponent, title: 'Wishlist ❤️ | FakeStore' },
  { path: 'produto/:id', component: ProductDetail, title: 'Detalhes do Produto' },
  //{ path: 'cartList', component: CartListComponent, title: 'Carrinho' },
  { path: '**', redirectTo: '' }
];
