import { cn } from '@/lib/utils';
import styles from './add-user.module.scss';
import { UiInputField } from '@/shared/ui/ui-input-filed/ui-input-field';
import { useTranslation } from 'react-i18next';

export const AddUser = ({ hideModal }: {hideModal: (state?: boolean) => void}) => {
  const { t } = useTranslation();
  console.log(hideModal)

  return (
    <form className={cn(styles['add-user-content'])} onClick={event => event.stopPropagation()}>
        <UiInputField
          inputProps={{
            type: 'text',
          }}
          label={t('username')}
        />
    </form>
  )
}