import { sessionStore } from "@/entities/session";
import { useAppSelector } from "@/shared/lib/redux";
import { Header } from "@/widgets/header/Header";
import { Outlet } from "react-router-dom";

export function RootLayout() {
  const _session = useAppSelector(sessionStore.selectors.selectSession);

  if (!_session) {
    console.log(_session)
    return (<div></div>);
  }

  return (
    <div
      className='min-h-screen flex flex-col'
    >
      <Header />
      <main className='grow flex flex-col'>
        <Outlet />
      </main>
    </div>
  )
}
