import { FC, useRef } from "react";
import styles from './nav.module.scss';
import clsx from "clsx";
import { NavArrow } from "./nav-arrow/nav-arrow";
import { Users } from "lucide-react";

export const Nav: FC<{}> = () => {

  const refInner = useRef<HTMLDivElement | null>(null);
  const refChildMethods = useRef<{toggle: (() => void) | null}>({toggle: null});

  const toggleNav = (state: boolean) => {
    if (state) {
      refInner.current!.classList.add(styles.opened);
      const windowClick = (event: Event) => {
        const clickEl = event.target as HTMLElement;
        if (clickEl.closest && !clickEl.closest('.' + styles['nav-content'])) {
          window.removeEventListener('click', windowClick);
          if (refChildMethods.current.toggle) {
            refChildMethods.current.toggle();
          } 
        }
      }
      window.addEventListener('click', windowClick);
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
          <p className="text-[16px] font-bold text-[var(--primary)]">Users</p>
        </div>
      </div>
    </div>
  )
}