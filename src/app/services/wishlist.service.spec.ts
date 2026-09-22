import { TestBed } from '@angular/core/testing';
import { WishlistService } from './wishlist.service';
import { Product } from '../models/product.model';

describe('WishlistService', () => {
  let service: WishlistService;

  const mockProduct: Product = {
    id: 1,
    title: 'Produto Teste',
    price: 99.9,
    description: 'Descrição de teste',
    category: 'electronics',
    image: 'https://via.placeholder.com/150'
  };

  beforeEach(() => {
    let store: Record<string, string> = {};
    const mockStorage = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, val: string) => { store[key] = val; },
      removeItem: (key: string) => { delete store[key]; },
      clear: () => { store = {}; }
    };

    Object.defineProperty(window, 'localStorage', {
      value: mockStorage,
      writable: true,
      configurable: true
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistService);
  });

  it('deve inicializar com a lista vazia', () => {
    expect(service.getItems().length).toBe(0);
  });

  it('deve adicionar um produto à Wishlist', () => {
    service.addToWishlist(mockProduct);
    expect(service.getItems().length).toBe(1);
    expect(service.isInWishlist(mockProduct.id)).toBe(true);
  });

  it('deve alternar produto na Wishlist (toggle)', () => {
    service.toggleWishlist(mockProduct);
    expect(service.isInWishlist(mockProduct.id)).toBe(true);

    service.toggleWishlist(mockProduct);
    expect(service.isInWishlist(mockProduct.id)).toBe(false);
  });

  it('deve remover produto da Wishlist pelo ID', () => {
    service.addToWishlist(mockProduct);
    service.removeFromWishlist(mockProduct.id);
    expect(service.isInWishlist(mockProduct.id)).toBe(false);
  });
});
