import * as React from 'react';
import TextInput from "../components/TextInput";
import Card from "../components/Card";
import { generateKey } from "../utils/stringUtils";
import { CardType, ColumnType } from "../types/types";

type ColumnPropTypes = {
  onEditColumn: (columnId: string, values: any) => void
  onRemoveColumn: (columnId: string) => void
  transferCard: (from: string, to: string, card: CardType) => void
};

type CardEditValuesType = {
  title?: string;
  description?: string;
};

const Column: React.FC<ColumnType & ColumnPropTypes> = (props) => {
  const { id: columnId, title, cards, onEditColumn, onRemoveColumn, transferCard } = props;

  const onTitleChange = (e: React.BaseSyntheticEvent) => {
    onEditColumn(columnId, { title: e.target.value });
  };

  const onCardEdit = (cardId: string, values: CardEditValuesType) => {
    const newCards: CardType[] = cards.slice();
    const cardIndex: number = cards.findIndex(({ id }: any) => id === cardId);
    newCards[cardIndex] = Object.assign({}, newCards[cardIndex], values);
    onEditColumn(columnId, { cards: newCards });
  };

  const onAddNewCard = () => {
    const newCard: CardType = { id: generateKey(), title: 'New Card', description: 'description' };
    onEditColumn(columnId, { cards: [...cards, newCard]});
  };

  const onRemoveCard = (cardId: string) => {
    const newCards: CardType[] = cards.filter(({ id }: any) => {
      return id !== cardId;
    });
    onEditColumn(columnId, { cards: newCards });
  };

  const onRemoveColumnClick = () => {
    onRemoveColumn(columnId);
  };

  const onDrop = (e: React.DragEvent) => {
    const card: CardType = JSON.parse(e.dataTransfer.getData('card'));
    const fromColumnId: string = e.dataTransfer.getData('columnId');

    if (fromColumnId !== columnId) {
      transferCard(fromColumnId, columnId, card);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className='column' onDragOver={onDragOver} onDrop={onDrop}>
      <div className='column-header'>
        <TextInput value={title} onChange={onTitleChange} />
        <button onClick={onRemoveColumnClick}>x</button>
      </div>
      <div className='column-body'>
        {cards.map(({ id: cardId, ...rest }: CardType) => {
          return (
            <Card
              key={cardId}
              id={cardId}
              columnId={columnId}
              {...rest}
              onTitleChange={(e: React.BaseSyntheticEvent) => {
                onCardEdit(cardId, { title: e.target.value });
              }}
              onDescriptionChange={(e: React.BaseSyntheticEvent) => {
                onCardEdit(cardId, { description: e.target.value });
              }}
              onRemoveCard={() => {
                onRemoveCard(cardId);
              }}
            />
          );
        })}
      </div>
      <div className='column-footer'>
        <button onClick={onAddNewCard}>Add New Card</button>
      </div>
    </div>
  );
};

export default Column;
