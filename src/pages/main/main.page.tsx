import { UsersManage } from "@/features/users";
import clsx from "clsx";

export function MainPage() {

  return(
    <div className={clsx('grow px-2 main-page')}>
      <UsersManage />
    </div>
  );
}