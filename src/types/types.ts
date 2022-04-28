export type CardType = {
  id: string;
  title: string;
  description: string;
};

export type ColumnType = {
  id: string;
  title: string;
  cards: CardType[];
};
