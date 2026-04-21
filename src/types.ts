export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Men' | 'Women' | 'Accessories' | 'Collections';
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
