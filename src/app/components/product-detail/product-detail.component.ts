import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetail implements OnInit {

  produto: any = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private wishlistService: WishlistService
  ) { }

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.productService.getProductById(Number(id)).subscribe({
      next: (dados) => this.produto = dados,
      error: (erro) => console.error('Erro ao buscar produto:', erro),
    });
  }
  }
}
