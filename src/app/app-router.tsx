import { Navigate, RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import { RootLayout } from "@/widgets/root-layout/ui/root-layout";
import { ROUTER_PATHS } from "@/shared/constants";
import MainPage from "@/pages/main";
import AuthPage from "@/pages/auth";
import { Session, sessionStore } from "@/entities/session";
import { useAppSelector } from "@/shared/lib/redux";

const secureRouter = (session: Session | undefined) => {
  const router = createBrowserRouter([
    {
      path: ROUTER_PATHS.HOME,
      element: session ? <RootLayout /> : <Navigate to={ROUTER_PATHS.AUTH} />,
      children: [
        {
          path: '',
          element: <MainPage />,
        },
      ]
    },
    {
      path: ROUTER_PATHS.AUTH,
      element: !session ? <AuthPage /> : <Navigate to={ROUTER_PATHS.HOME} />
    },
    {
      path: '*',
      loader: () => redirect(ROUTER_PATHS.HOME)
    }
  ]);
  return router
}

export function AppRouter() {
  const _session = useAppSelector(sessionStore.selectors.selectSession);

  return(
    <RouterProvider router={secureRouter(_session)} />
  )
}