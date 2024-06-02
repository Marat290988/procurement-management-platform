import { cn } from '@/lib/utils';
import styles from './notification.module.scss';
import { useAppSelector } from '@/shared/lib/redux';
import { NotificationType, notificationStore } from '../model/notification.store';
import { Info, AlertTriangle, XCircle, CheckCheck } from 'lucide-react';

export function NotificationComponent() {

  const noteData = useAppSelector(notificationStore.selectors.noteData);

  console.log(noteData)

  return (
    <>
      {noteData.length > 0 ? (
        <div className={cn(styles['notification-content'])}>
          {noteData.map(n => (
            <div
              className={cn(
                styles['notification-card'],
                styles[n.type]
              )}
              key={n.id}
            >
              {getIcon(n.type)}
              <p>{n.message}</p>
            </div>
          ))}
        </div>
      ) : <></>}
    </>

  )
}

const getIcon = (type: NotificationType['type']): JSX.Element => {
  if (type === 'info') {
    return <Info color='#0069d9' size={14} />;
  }
  if (type === 'warn') {
    return <AlertTriangle color='#ffc107' size={14} />
  }
  if (type === 'error') {
    return <XCircle color='#dc3545' size={14} />;
  }
  return <CheckCheck color='#28a745' size={14} />
}