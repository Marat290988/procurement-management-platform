import clsx from 'clsx';
import styles from './UserHeader.module.scss';
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux';
import { sessionStore } from '@/entities/session';
import { AvatarSvg } from '../../assets/avatar.svg';
import { UiPopover } from '@/shared/ui/ui-popover/ui-popover';
import { useState } from 'react';
import { UiSvg } from '@/shared/ui/ui-svg/ui-svg';
import { useTranslation } from 'react-i18next';
import { useModalSure } from '@/features/modal/ui/useModalSure';
import { UiImage } from '@/shared/ui/ui-avatar/ui-image';

export const UserHeader = () => {

  const sessionUser = useAppSelector(sessionStore.selectors.selectSession);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { openSureModal } = useModalSure();

  const logout = () => {
    setIsOpen(false);
    openSureModal().afterClose(data => {
      if (data) {
        dispatch(sessionStore.actions.removeSession());
      }
    })
  };

  const content = (
    <div className={styles['pop-contnet']}>
      <div className={styles['pop-contnet-row']}>
        <UiSvg svgName='USER' className={styles['back-inherit']} />
        <p className={styles['pop-contnet-row__item']}>{t('profile')}</p>
      </div>
      <div className={styles['pop-contnet-line']}></div>
      <div className={styles['pop-contnet-row']} onClick={logout}>
        <UiSvg svgName='LOGOUT' className={styles['back-inherit']} />
        <p className={styles['pop-contnet-row__item']}>{t('logout')}</p>
      </div>
    </div>
  );

  return (
    <>
      <UiPopover
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        content={content}
      >
        <div className={clsx(styles['header-user-content'])}>
          <div className={clsx(styles['header-user-content__logo'])}>
            {!sessionUser?.avatar && <AvatarSvg />}
            {sessionUser?.avatar && <UiImage base64={sessionUser?.avatar} size={{height: '40px',width: '40px'}} />}
          </div>
          <div className={clsx(styles['header-user-content__username'])}>
            {sessionUser?.name}
          </div>
        </div>
      </UiPopover>
    </>

  )
}