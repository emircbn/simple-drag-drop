import * as React from "react";
import Column from "./Column";
import { generateKey } from "../utils/stringUtils";
import { CardType, ColumnType } from "../types/types";

type columnEditValuesType = {
  title?: string;
  cards?: CardType[];
};

const Homepage: React.FC = () => {
  const [columns, setColumns] = React.useState<ColumnType[]>([]);

  const onAddColumn = () => {
    const newColumn = Object.assign({ id: generateKey() }, { title: 'New Column', cards: [] });
    setColumns([...columns, newColumn]);
  };

  const onEditColumn = (columnId: string, editedColumn: columnEditValuesType) => {
    const newColumns: ColumnType[] = columns.slice();
    const columnIndex: number = columns.findIndex(({ id }) => id === columnId);
    newColumns[columnIndex] = Object.assign({}, newColumns[columnIndex], editedColumn);
    setColumns(newColumns);
  };

  const onRemoveColumn = (columnId: string) => {
    const newColumns: ColumnType[] = columns.filter(({ id }) => {
      return id !== columnId;
    });
    setColumns(newColumns);
  };

  const transferCard = (from: string, to: string, card: CardType) => {
    const newColumns: ColumnType[] = columns.reduce((acc: ColumnType[], column: ColumnType) => {
      if (column.id === from) {
        column.cards = column.cards.filter(({ id }: any) => id !== card.id);
        acc.push(column);
      } else if (column.id === to) {
        column.cards.push(card);
        acc.push(column);
      } else {
        acc.push(column);
      }

      return acc;
    }, []);
    setColumns(newColumns);
  };

  return (
    <div>
      <div>
        <button onClick={onAddColumn}>Add Column</button>
      </div>
      <div className='column-container'>
        {columns.map(({ id, ...rest}: any) => {
          return (
            <Column
              key={id}
              id={id}
              {...rest}
              transferCard={transferCard}
              onEditColumn={onEditColumn}
              onRemoveColumn={onRemoveColumn}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Homepage;
