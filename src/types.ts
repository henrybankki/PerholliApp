// src/types.ts
export interface Newspaper {
  id?: string; // Firestore ID
  name: string; // lehden nimi
  description: string; // lyhyt kuvaus
}

export interface Article {
  id?: string;
  title: string;
  content: string;
  newspaperId: string;
}

export interface Poll {
  id?: string;
  question: string;
  options: string[];
  votes: number[];
}
