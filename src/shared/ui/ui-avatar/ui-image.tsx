import { cn } from '@/lib/utils';
import styles from './ui-image.module.scss';
import { Pencil } from 'lucide-react';
import { useRef } from 'react';

export function UiImage({ base64, isEdit }: { base64?: string, isEdit?: boolean }) {

  const inputRef = useRef<HTMLInputElement | null>(null);
  const editImage = () => {
    inputRef.current?.click();
  }
  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event)
  }

  return (
    <div className={cn(styles['avatar-content'], 'relative')}>
      {isEdit && (
        <div className='rounded-full bg-[#d54195] p-[4px] absolute top-[2px] right-[2px] cursor-pointer'>
          <Pencil color='#fff' size={10} style={{ backgroundColor: '#d54195' }} onClick={editImage}/>
          <input type='file' accept='image/*' hidden ref={inputRef} onChange={onChangeImage} />
        </div>
      )}
      {!base64 && (
        <>
          <img className={cn(styles['avatar-content__default'])} src='/images/user.png' />
        </>
      )}
    </div>
  );
}