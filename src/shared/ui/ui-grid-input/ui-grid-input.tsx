import { cn } from '@/lib/utils';
import styles from './ui-grid-input.module.scss';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Ban, Check, Pencil } from 'lucide-react';

interface IUiGridInput {
  value: string,
  isEdit?: boolean,
  saveValue?: (value: string) => void
}

export function UiGridInput({ value, isEdit, saveValue }: IUiGridInput) {

  const [editValue, setEditValue] = useState<string>(value);
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const initValue = value;

  const inputHandle = (event: any) => {
    setEditValue(event.target.value);
  }

  const changeMode = (state: boolean) => {
    setEditMode(state);
    if (!state && editValue !== 's' && saveValue) {
      saveValue(editValue as string);
    }
  }

  const cancelHandle = () => {
    setEditValue(initValue);
    setEditMode(false);
  }

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      changeMode(false);
    }
  }

  useEffect(() => {
    if (editMode) {
      inputRef.current?.focus();
    }
  }, [editMode]);

  return (
    <div className={cn(styles['grid-input-content'])}>
      {!isEdit && value}
      {isEdit && (
        <div className={styles['input-container']}>
          {!editMode && <div className={cn(styles['input-cover'])} onDoubleClick={() => changeMode(true)}></div>}
          <input 
            value={editValue} 
            disabled={!editMode} 
            onInput={inputHandle} 
            ref={inputRef} 
            onKeyDown={handleEnter}
          />
          <div className={styles['input-icon']}>
            {!editMode && <Pencil color='#28a745' size={15} onClick={() => changeMode(true)} />}
            {editMode && editValue !== '' && <Check color='#28a745' size={15} onClick={() => changeMode(false)} />}
            {editMode && <Ban color='var(--error-color)' size={15} onClick={cancelHandle} />}
          </div>
        </div>
      )}
    </div>
  )
}