import { cn } from '@/lib/utils';
import styles from './table-grid-row..module.scss';
import { CSSProperties } from 'react';

export interface ICell {
  value: string,
  styles?: CSSProperties,
  size: string,
  component?: JSX.Element,
}

export function UiTableGridRow({dataRow, gridWidth}: {dataRow: ICell[], gridWidth: string}) {

  return (
    <div className={cn(styles.row)} style={{gridTemplateColumns: gridWidth}}>

      {dataRow.map((d, index) => (
        <div
          className={cn(styles.cell)}
          style={{...d.styles}}
          key={index}
        >
          {d.component ? d.component : d.value}
        </div>
      ))}

    </div>
  )
}