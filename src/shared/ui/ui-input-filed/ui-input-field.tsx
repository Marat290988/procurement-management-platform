import { useId, CSSProperties, PropsWithRef, InputHTMLAttributes, useState  } from 'react';
import classes from './ui-input-field.module.scss';
import { FormState } from 'react-hook-form';

export type UiInputFieldProps = {
  size?: 'lg' | 'md' | 'sm',
  label?: string,
  inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>,
  errorMessage?: string | null,
  formState?: FormState<any>
}

export function UiInputField({ size, label, inputProps, errorMessage, formState }: UiInputFieldProps) {

  const id = useId();

  const [firstTouch, setFirstTouch] = useState(false);

  const cssStyles: CSSProperties = {minHeight: '30px', minWidth: '250px', fontSize: '18px'};

  if (size === 'md') {
    cssStyles.minHeight = '30px';
  } else if (size === 'sm') {
    cssStyles.minHeight = '30px';
  }

  let isError = false;

  if (
    formState && 
    inputProps?.name &&
    formState.errors[inputProps?.name] &&
    formState.dirtyFields[inputProps?.name]
  ) {
    isError = true;
  }

  return (
    <div className="w-full">
      {label && <label htmlFor={id} className={classes['label']}>
        {label}:
      </label>}
      <div className={classes['input-cont']} style={{...cssStyles}}>
        <input 
          id={id} 
          {...inputProps}
          onBlur={() => setFirstTouch(true)}
        />
        <div 
          className={`${classes['input-border']} transition-colors ${isError ? classes['input-border-error'] : ''}`}
        >
        </div>
      </div>
      {errorMessage && firstTouch && <div className={classes['error-message']}>{errorMessage}</div>}
    </div>
  );
}