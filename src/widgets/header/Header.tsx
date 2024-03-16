import clsx from 'clsx';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { UserHeader } from '@/entities/user/ui/user-header/UserHeader';
import { UpdateLang } from '@/features/language';
import { UpdateTheme } from '@/features/theme';

export const Header = () => {

  return (
    <header className={clsx(styles.header)}>
      <div
        className={clsx(styles['header-inner'])}
      >
        <Link to='/' className='mr-auto'>
          <div
            className={clsx(styles['header-inner-logo'])}
          >
            PM PLATFORM
          </div>
        </Link>
        <div 
          className={clsx(styles['header-inner-item'])}
        >
          <UserHeader />
        </div>
        <div 
          className={clsx(styles['header-inner-item'])}
        >
          <UpdateLang />
        </div>
        <div 
          className={clsx(styles['header-inner-item'])}
        >
          <UpdateTheme />
        </div>
      </div>
    </header>
  );
}