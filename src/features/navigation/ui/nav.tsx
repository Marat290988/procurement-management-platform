import { FC } from "react";
import styles from './nav.module.scss';
import clsx from "clsx";
import { NavArrow } from "./nav-arrow/nav-arrow";

export const Nav: FC<{}> = () => {

  const toggleNav = (state: boolean) => {
    console.log(state)
  }

  return(
    <div className={clsx(styles['nav-content'])}>
      <div className={clsx(styles['nav-content-inner'])}>
        <NavArrow toggleNav={toggleNav} />
      </div>
    </div>
  )
}