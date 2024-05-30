import { cn } from '@/lib/utils';
import styles from './ui-table-grid.module.scss';
import { ICell, UiTableGridRow } from './table-grid-row/table-grid-row';

export interface ITableGrid {
  header: ICell[],
  body: ICell[][],
}

export function UiTableGrid({header, body}: ITableGrid) {

  let gridWidth = '';
  header.forEach((h, index) => {
    if (header.length - 1 !== index) {
      gridWidth = gridWidth + h.size + ' ';
    } else {
      gridWidth = gridWidth + h.size;
    }
  });

  return (
    <div className={cn(styles.table)}>
      <UiTableGridRow dataRow={header} gridWidth={gridWidth} />
      {body.map((b, index) => (
        <UiTableGridRow dataRow={b} key={index} gridWidth={gridWidth} />
      ))}
    </div> 
  );
}