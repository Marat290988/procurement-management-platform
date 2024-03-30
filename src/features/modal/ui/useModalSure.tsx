import { useTranslation } from "react-i18next";
import { useModal } from ".."
import styles from './sure.module.scss';

export const useModalSure = () => {

  const { openModal, hideModal } = useModal();
  const { t } = useTranslation();

  const openSureModal = () => {
    openModal(
      <div className={styles['sure-content']} onClick={event => event.stopPropagation()}>
        <div className={styles['sure-content-title']}>{t('sure')}</div>
        <div className={styles['sure-content-buttons']}>
          <button>{t('yes')}</button>
          <button onClick={hideModal}>{t('cancel')}</button>
        </div>
      </div>
    )
  }

  return {
    openSureModal
  }

}