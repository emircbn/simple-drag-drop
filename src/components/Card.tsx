import * as React from "react";
import TextInput from "./TextInput";
import { CardType } from "../types/types";

type CardPropTypes = {
  columnId: string;
  onTitleChange: (e: React.BaseSyntheticEvent) => void
  onDescriptionChange: (e: React.BaseSyntheticEvent) => void
  onRemoveCard: () => void
};

const Card: React.FC<CardPropTypes & CardType> = (props) => {
  const { id, columnId, title, description, onTitleChange, onDescriptionChange, onRemoveCard } = props;

  const onDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('card', JSON.stringify({ id, title, description }));
    e.dataTransfer.setData('columnId', columnId);
  };

  return (
    <div className='card-container' draggable onDragStart={onDragStart}>
      <div className='card-header'>
        <TextInput value={title} onChange={onTitleChange}/>
        <button onClick={onRemoveCard}>x</button>
      </div>
      <div className='card-body'>
        <TextInput value={description} onChange={onDescriptionChange}/>
      </div>
    </div>
  );
};

export default Card;
