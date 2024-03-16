import clsx from 'clsx';
import styles from './UserHeader.module.scss';
import { useAppSelector } from '@/shared/lib/redux';
import { sessionStore } from '@/entities/session';
import { AvatarSvg } from '../../assets/avatar.svg';

export const UserHeader = () => {

  const sessionUser = useAppSelector(sessionStore.selectors.selectSession);

  return (
    <div className={clsx(styles['header-user-content'])}>
      <div className={clsx(styles['header-user-content__logo'])}>
        {!sessionUser?.avatarBlob && <AvatarSvg />}
      </div>
      <div className={clsx(styles['header-user-content__username'])}>
        {sessionUser?.name}
      </div>
    </div>
  )
}