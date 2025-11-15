
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

export interface GeminiPart {
  text: string;
}

export interface GeminiContent {
  role: 'user' | 'model';
  parts: GeminiPart[];
}
