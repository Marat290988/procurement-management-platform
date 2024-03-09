import { usersStore } from "@/entities/user";
import { useAppDispatch } from "@/shared/lib/redux";
import { ReactNode, useEffect, useState } from "react";

export const AppLoader = ({ children }: { children?: ReactNode }) => {

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      dispatch(usersStore.actions.loadUsers())
    ]).finally(() => {
      setIsLoading(false);
    });

  }, [dispatch]);

  return <>{children}</>;

}