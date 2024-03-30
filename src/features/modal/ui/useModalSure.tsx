import { useTranslation } from "react-i18next";
import { useModal } from ".."
import styles from './sure.module.scss';
import clsx from "clsx";

export const useModalSure = () => {

  const { openModal, hideModal } = useModal();
  const { t } = useTranslation();

  const openSureModal = () => {
    return openModal(
      <div className={styles['sure-content']} onClick={event => event.stopPropagation()}>
        <div className={styles['sure-content-title']}>{t('sure')}</div>
        <div className={styles['sure-content-buttons']}>
          <button className={clsx('primary')} onClick={() => hideModal(true)}>{t('yes')}</button>
          <button className={clsx('warn')} onClick={() => hideModal()}>{t('cancel')}</button>
        </div>
      </div>
    );
  }

  return {
    openSureModal
  }

}