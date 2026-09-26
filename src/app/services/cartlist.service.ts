import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartListService {
  private readonly storageKey = 'desafio_angular_cartlist';
  private itemsSubject = new BehaviorSubject<Product[]>(this.loadFromStorage());

  // Observable com a lista de produtos no carrinho
  cartlist$ = this.itemsSubject.asObservable();

  // Observable com a contagem de itens para o badge do Header
  count$: Observable<number> = this.cartlist$.pipe(
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

  // Salva itens no localStorage
  private saveToStorage(items: Product[]): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage && typeof window.localStorage.setItem === 'function') {
        window.localStorage.setItem(this.storageKey, JSON.stringify(items));
      }
    } catch {}
    this.itemsSubject.next(items);
  }

  // Retorna os itens atuais do carrinho
  getItems(): Product[] {
    return this.itemsSubject.getValue();
  }

  // Verifica se um produto está no carrinho
  isInCartList(productId: number): boolean {
    return this.getItems().some(item => item.id === productId);
  }

  // Alterna: adiciona se não estiver, remove se já estiver
  toggleCartList(product: Product): void {
    if (this.isInCartList(product.id)) {
      this.removeFromCartList(product.id);
    } else {
      this.addToCartList(product);
    }
  }

  // Adiciona um produto ao carrinho
  addToCartList(product: Product): void {
    const current = this.getItems();
    if (!this.isInCartList(product.id)) {
      this.saveToStorage([...current, product]);
    }
  }

  // Remove um produto do carrinho pelo ID
  removeFromCartList(productId: number): void {
    const updated = this.getItems().filter(item => item.id !== productId);
    this.saveToStorage(updated);
  }

  // Limpa todo o carrinho
  clearCartList(): void {
    this.saveToStorage([]);
  }
}
