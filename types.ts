export interface NavItem {
  label: string;
  href: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
}

export interface Project {
  title: string;
  type: string;
  imageUrl?: string;
}