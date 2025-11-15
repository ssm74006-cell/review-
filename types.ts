
export enum Category {
  Groceries = 'Groceries',
  Electronics = 'Electronics',
  Appliances = 'Appliances',
  Fashion = 'Fashion',
  Books = 'Books',
  Toys = 'Toys',
}

export interface Review {
  id: number;
  productName: string;
  rating: number;
  comment: string;
  reviewer: string;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}
