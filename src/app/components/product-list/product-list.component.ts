import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { WishlistService } from '../../services/wishlist.service';
//import { CartListService } from '../../services/cartlist.service';

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

  produtosOrdenados: string = 'avaliacao';

  carregando: boolean = true;
  erro: string | null = null;

  constructor(
    private productService: ProductService,
    private wishlistService: WishlistService,
    //private cartListService: CartListService
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarProdutos();
    this.ordenarProdutos();
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
    this.ordenarProdutos();
  }

  // Ordena os produtos pela opção selecionada
  ordenarProdutos() {
    if(this.produtosOrdenados === 'avaliacao'){
      this.produtosFiltrados.sort((a,b) => b.rating.rate - a.rating.rate)
    } else if(this.produtosOrdenados === 'menor-preco'){
      this.produtosFiltrados.sort((a,b) => a.price - b.price)
    } else if(this.produtosOrdenados === 'maior-preco'){
      this.produtosFiltrados.sort((a,b) => b.price - a.price)
    }
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

  /*
  // Altera o produto no Carrinho
  alterarCarrinho(produto: Product, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.cartListService.toggleCartList(produto);
  }

  // Verifica se o produto já esta no carrinho
  estaNoCarrinho(produtoId: number): boolean {
    return this.cartListService.isInCartList(produtoId);
  }*/

}
