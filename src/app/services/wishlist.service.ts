import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly storageKey = 'desafio_angular_wishlist';
  private itemsSubject = new BehaviorSubject<Product[]>(this.loadFromStorage());

  // Observable com a lista de produtos na Wishlist
  wishlist$ = this.itemsSubject.asObservable();

  // Observable com a contagem de itens para o badge do Header
  count$: Observable<number> = this.wishlist$.pipe(
    map(items => items.length)
  );

  constructor() {}

  // Carrega itens salvos no localStorage (com verificação para SSR / testes)
  private loadFromStorage(): Product[] {
    try {
      if (typeof window !== 'undefined' && window.localStorage && typeof window.localStorage.getItem === 'function') {
        const saved = window.localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : [];
      }
      return [];
    } catch {
      return [];
    }
  }

  // Salva itens no localStorage e notifica os ouvintes
  private saveToStorage(items: Product[]): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage && typeof window.localStorage.setItem === 'function') {
        window.localStorage.setItem(this.storageKey, JSON.stringify(items));
      }
    } catch {}
    this.itemsSubject.next(items);
  }

  // Retorna os itens atuais da wishlist
  getItems(): Product[] {
    return this.itemsSubject.getValue();
  }

  // Verifica se um produto está na lista de desejos
  isInWishlist(productId: number): boolean {
    return this.getItems().some(item => item.id === productId);
  }

  // Alterna: adiciona se não estiver, remove se já estiver
  toggleWishlist(product: Product): void {
    if (this.isInWishlist(product.id)) {
      this.removeFromWishlist(product.id);
    } else {
      this.addToWishlist(product);
    }
  }

  // Adiciona um produto à wishlist
  addToWishlist(product: Product): void {
    const current = this.getItems();
    if (!this.isInWishlist(product.id)) {
      this.saveToStorage([...current, product]);
    }
  }

  // Remove um produto da wishlist pelo ID
  removeFromWishlist(productId: number): void {
    const updated = this.getItems().filter(item => item.id !== productId);
    this.saveToStorage(updated);
  }

  // Limpa toda a lista de desejos
  clearWishlist(): void {
    this.saveToStorage([]);
  }
}
