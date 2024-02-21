import { store } from "@/shared/lib/redux";
import { Provider } from "react-redux";

export function AppStore({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      { children }
    </Provider>
  );
}