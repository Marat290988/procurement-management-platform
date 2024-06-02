import { cn } from '@/lib/utils';
import styles from './ui-image.module.scss';
import { Pencil } from 'lucide-react';
import { useRef } from 'react';
import { toBase64 } from '@/shared/lib/utils';
import { useAppDispatch } from '@/shared/lib/redux';
import { notificationStore } from '@/features/notification/model/notification.store';

interface IUiImage {
  base64?: string, 
  isEdit?: boolean, 
  editFunc?: Function, 
  field?: string, 
  id?: string,
  size?: {width: string, height: string}
}

export function UiImage({ base64, isEdit, editFunc, field, id, size }: IUiImage) {

  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editImage = () => {
    inputRef.current?.click();
  }
  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files![0]) {
      const file = event.target.files![0];
      event.target.value = '';
      toBase64(file, 80).then(img => {
        editFunc!(img, field!, id);
        dispatch(notificationStore.actions.addNotificationWithTimeout({id: '', message: 'Аватар изменен', type: 'success', ms: 100000}));
      });
    }
  }

  return (
    <div className={cn(styles['avatar-content'], 'relative')}>
      {isEdit && (
        <div className='rounded-full bg-[#d54195] p-[4px] absolute top-[2px] right-[2px] cursor-pointer'>
          <Pencil color='#fff' size={10} style={{ backgroundColor: '#d54195' }} onClick={editImage}/>
          <input type='file' accept='image/*' hidden ref={inputRef} onChange={onChangeImage} />
        </div>
      )}
      {(!base64) && (
        <>
          <img 
            className={cn(styles['avatar-content__default'])} 
            src='/images/user.png' 
            style={size && {
              width: size.width,
              height: size.height
            }}
          />
        </>
      )}
      {(base64) && (
        <>
          <img 
            className={cn(styles['avatar-content__user'])} 
            src={base64} 
            style={size && {
              width: size.width,
              height: size.height
            }}
          />
        </>
      )}
    </div>
  );
}