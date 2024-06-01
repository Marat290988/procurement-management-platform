import { FC, MutableRefObject, useState } from 'react';
import styles from './nav-arrow.module.scss';
import clsx from 'clsx';

export const NavArrow: FC<{
  toggleNav: (state: boolean) => void,
  refChildMethods: MutableRefObject<any>
}> = ({ toggleNav, refChildMethods }) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggleIcon = () => {
    setIsOpen(prev => {
      toggleNav(!prev);
      return !prev;
    });
  }

  const closeIcon = () => {
    setIsOpen(false);
    toggleNav(false);
  }

  refChildMethods.current = {toggle: closeIcon};

  return(
    <div className={clsx(styles['arrow-content'], isOpen && styles['opened'])} onClick={toggleIcon}>
      <div className={clsx(styles['arrow-content-top'], styles['arrow-item'])}></div>
      <div className={clsx(styles['arrow-content-bottom'], styles['arrow-item'])}></div>
    </div>
  ) 
}