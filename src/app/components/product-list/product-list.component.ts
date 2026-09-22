import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  produtos: Product[] = [];
  produtosFiltrados: Product[] = [];
  categorias: string[] = [];

  termoBusca: string = '';
  categoriaSelecionada: string = 'todas';

  carregando: boolean = true;
  erro: string | null = null;

  constructor(
    private productService: ProductService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarProdutos();
  }

  // Busca lista de categorias da API
  carregarCategorias(): void {
    this.productService.getCategories().subscribe({
      next: (dados) => {
        this.categorias = dados;
      },
      error: (err) => console.error('Erro ao carregar categorias', err)
    });
  }

  // Busca produtos da Fake Store API
  carregarProdutos(): void {
    this.carregando = true;
    this.erro = null;

    this.productService.getProducts().subscribe({
      next: (dados) => {
        this.produtos = dados;
        this.aplicarFiltros();
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos', err);
        this.erro = 'Não foi possível carregar os produtos da Fake Store API. Verifique sua conexão e tente novamente.';
        this.carregando = false;
      }
    });
  }

  // Filtra por categoria selecionada e texto digitado na busca
  aplicarFiltros(): void {
    let resultado = this.produtos;

    // Filtro por categoria
    if (this.categoriaSelecionada !== 'todas') {
      resultado = resultado.filter(p => p.category === this.categoriaSelecionada);
    }

    // Filtro por termo de busca
    if (this.termoBusca.trim() !== '') {
      const termo = this.termoBusca.toLowerCase().trim();
      resultado = resultado.filter(p => 
        p.title.toLowerCase().includes(termo) || 
        p.description.toLowerCase().includes(termo)
      );
    }

    this.produtosFiltrados = resultado;
  }

  selecionarCategoria(categoria: string): void {
    this.categoriaSelecionada = categoria;
    this.aplicarFiltros();
  }

  // Alterna o produto na Wishlist (Lista de Desejos)
  alternarWishlist(produto: Product, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.wishlistService.toggleWishlist(produto);
  }

  // Verifica se o produto já está favoritado
  estaNaWishlist(produtoId: number): boolean {
    return this.wishlistService.isInWishlist(produtoId);
  }
}
