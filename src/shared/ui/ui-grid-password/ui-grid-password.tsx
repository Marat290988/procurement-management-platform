import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import styles from './ui-grid-password.module.scss';
import { cn } from '@/lib/utils';
import { Ban, Check, Pencil } from 'lucide-react';

export function UiGridPassword({ savePassword }: { savePassword: (value: string) => void }) {

  const [editValue, setEditValue] = useState<string>('******');
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const initValue = '******';

  const inputHandle = (event: any) => {
    setEditValue(event.target.value);
  }

  const changeMode = (state: boolean) => {
    setEditMode(state);
    if (state) {
      setEditValue('');
    }
    if (!state && editValue.length > 5 && savePassword) {
      savePassword(editValue as string);
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
      <div className={styles['input-container']}>
        {!editMode && <div className={cn(styles['input-cover'])} onDoubleClick={() => changeMode(true)}></div>}
        <input
          value={editValue}
          disabled={!editMode}
          onInput={inputHandle}
          ref={inputRef}
          onKeyDown={handleEnter}
          type='password'
        />
        <div className={styles['input-icon']}>
          {!editMode && <Pencil color='#28a745' size={15} onClick={() => changeMode(true)} />}
          {editMode && editValue.length > 5 && <Check color='#28a745' size={15} onClick={() => changeMode(false)} />}
          {editMode && <Ban color='var(--error-color)' size={15} onClick={cancelHandle} />}
        </div>
      </div>
    </div>
  )

}