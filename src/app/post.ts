import { NumericLiteral } from "typescript";

export interface Post {
    id: number;
    user: string;
    user_id: number;
    user_image: string;
    image?: string;
    content: string;
    date: string;
    likes: number;
  }