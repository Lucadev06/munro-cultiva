"use client"
import { createContext, useState, useContext, ReactNode } from 'react';
import { IProduct } from '../types/Product';

interface CartItem extends IProduct {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: IProduct) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  const addToCart = (product: IProduct) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item._id === product._id);
      let newCart;
      if (existingProduct) {
        newCart = prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }
      updateTotal(newCart);
      return newCart;
    });
  };

  const increaseQuantity = (productId: string) => {
    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      updateTotal(newCart);
      return newCart;
    });
  };

  const decreaseQuantity = (productId: string) => {
    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        item._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      updateTotal(newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item._id !== productId);
      updateTotal(newCart);
      return newCart;
    });
  };

  const updateTotal = (cart: CartItem[]) => {
    const newTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
