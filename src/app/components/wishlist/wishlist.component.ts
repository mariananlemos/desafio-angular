import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  itensWishlist$: Observable<Product[]>;

  constructor(private wishlistService: WishlistService) {
    this.itensWishlist$ = this.wishlistService.wishlist$;
  }

  ngOnInit(): void {}

  remover(produtoId: number): void {
    this.wishlistService.removeFromWishlist(produtoId);
  }

  limparTudo(): void {
    if (confirm('Tem certeza que deseja limpar toda a sua lista de desejos?')) {
      this.wishlistService.clearWishlist();
    }
  }
}
