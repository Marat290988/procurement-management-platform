import { sessionStore } from "@/entities/session";
import { usersStore } from "@/entities/user";
import { themeStore } from "@/features/theme/model";
import { useAppDispatch } from "@/shared/lib/redux";
import { ReactNode, useEffect, useState } from "react";

export const AppLoader = ({ children }: { children?: ReactNode }) => {

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      dispatch(usersStore.actions.loadUsers()),
      dispatch(sessionStore.actions.loadSession()),
      dispatch(themeStore.actions.loadTheme())
    ]).finally(() => {
      setIsLoading(false);
    });

  }, [dispatch]);

  if (isLoading) {
    return (
      <div 
        className='h-screen flex items-center justify-center text-[30px] bg-[var(--base-background-color)] color text-[var(--text-color)]'
      >
        LOADING...
      </div>
    );
  }

  return <>{children}</>;

}