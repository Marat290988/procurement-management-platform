import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import { RootLayout } from "@/widgets/root-layout/ui/root-layout";
import { ROUTER_PATHS } from "@/shared/constants";
import MainPage from "@/pages/main";
import AuthPage from "@/pages/auth";

const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.HOME,
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <MainPage />,
      },
      
    ]
  },
  {
    path: ROUTER_PATHS.AUTH,
    element: <AuthPage />
  },
  {
    path: '*',
    loader: () => redirect(ROUTER_PATHS.HOME)
  }
]);

export function AppRouter() {
  return(
    <RouterProvider router={router} />
  )
}