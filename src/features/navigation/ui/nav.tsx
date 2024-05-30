import { FC, useCallback, useEffect, useRef } from "react";
import styles from './nav.module.scss';
import clsx from "clsx";
import { NavArrow } from "./nav-arrow/nav-arrow";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Nav: FC<{}> = () => {

  const refInner = useRef<HTMLDivElement | null>(null);
  const refChildMethods = useRef<{toggle: (() => void) | null}>({toggle: null});
  const windowClickCallback = useCallback((event: Event) => {
    const clickEl = event.target as HTMLElement;
    if (clickEl.closest && !clickEl.closest('.' + styles['nav-content'])) {
      window.removeEventListener('click', windowClickCallback);
      if (refChildMethods.current.toggle) {
        refChildMethods.current.toggle();
      } 
    }
  }, []);
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      window.removeEventListener('click', windowClickCallback);
    }
  }, [])

  const toggleNav = (state: boolean) => {
    if (state) {
      refInner.current!.classList.add(styles.opened);
      window.addEventListener('click', windowClickCallback);
    } else {
      refInner.current!.classList.remove(styles.opened);
    }
  }

  return(
    <div className={clsx(styles['nav-content'])}>
      <div className={clsx(styles['nav-content-inner'])} ref={refInner}>
        <NavArrow toggleNav={toggleNav} refChildMethods={refChildMethods} />
        <div className={clsx(styles['nav-content-inner__item'], 'flex', 'gap-1')}>
          <div className="flex min-w-[30px] justify-center">
            <Users color="var(--primary)" size={20} />
          </div>
          <Link to='/'>
            <p className="text-[16px] font-bold text-[var(--primary)]">{t('menu_user')}</p>
          </Link>
        </div>
      </div>
    </div>
  )
}