
export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
}
