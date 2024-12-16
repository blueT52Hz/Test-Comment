import { Category } from "./category";
import { Tag } from "./tag";

export type Post = {
  id: string;
  title: string;
  category: Category;
  excerpt: string;
  thumbnail_image_url: string;
  tags: Tag[];
  published_at: string;
  slug: string;
  content_type: string;
  content: string;
};
