import { Outlet } from "react-router-dom";

export function RootLayout() {
  return (
    <div
      className='min-h-screen flex flex-col'
    >
      <header>
        HEADER
      </header>
      <main className='grow flex flex-col'>
        <Outlet />
      </main>
    </div>
  )
}
