import { useId, CSSProperties  } from 'react';
import classes from './ui-input-field.module.scss';

export type UiInputFieldProps = {
  size?: 'lg' | 'md' | 'sm'
}

export function UiInputField({ size }: UiInputFieldProps) {

  const id = useId();

  const cssStyles: CSSProperties = {minHeight: '30px', minWidth: '250px', fontSize: '18px'};

  if (size === 'md') {
    cssStyles.minHeight = '30px';
  } else if (size === 'sm') {
    cssStyles.minHeight = '30px';
  }

  return (
    <div className="w-full">
      <label htmlFor={id} className={classes['label']}>
        LABEL:
      </label>
      <div className={classes['input-cont']} style={{...cssStyles}}>
        <input 
          id={id} 
        />
        <div className={classes['input-border']}></div>
      </div>
    </div>
  );
}