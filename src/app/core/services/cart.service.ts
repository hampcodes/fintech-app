import { Injectable, signal } from '@angular/core';
import { ProductResponse } from '../models/product.model';

export interface CartItem {
  product: ProductResponse;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cart = signal<CartItem[]>([]);

  cart = this._cart.asReadonly();

  addToCart(product: ProductResponse, quantity: number = 1) {
    const currentCart = this._cart();
    const existingItem = currentCart.find(item => item.product.id === product.id);

    if (existingItem) {
      // Actualizar cantidad si ya existe
      const updatedCart = currentCart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      this._cart.set(updatedCart);
    } else {
      // Agregar nuevo item
      this._cart.set([...currentCart, { product, quantity }]);
    }
  }

  removeFromCart(productId: string) {
    const updatedCart = this._cart().filter(item => item.product.id !== productId);
    this._cart.set(updatedCart);
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const updatedCart = this._cart().map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    );
    this._cart.set(updatedCart);
  }

  clearCart() {
    this._cart.set([]);
  }

  getTotal(): number {
    return this._cart().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getItemCount(): number {
    return this._cart().reduce((count, item) => count + item.quantity, 0);
  }
}
