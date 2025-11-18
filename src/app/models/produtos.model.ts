export interface Produto {
  id: string;
  nome: string;
  artista: string;
  preco: number;
  imagem: string;
  ano?: number;
  genero?: string;
  gravadora?: string;
  formato?: string;
  descricao?: string;
  faixas?: string[];
}
