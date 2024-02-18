import {
  Reducer,
  Slice,
  combineReducers,
  configureStore
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore<any>({
  reducer: {
    app: (store = {}) => store
  }
});

export const useAppSelector = useSelector;
export const useAppDispatch = (): typeof store.dispatch => {
  return useDispatch();
};

export const createBaseSelector = <S, N extends string>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slice: Slice<S, any, N>,
) => {
  return (store: unknown) => {
    const anyStore = store as Record<string, unknown>;
    return anyStore[slice.name] as S;
  };
};

const slicesSet = new Set<Slice>();

export const registerSlice = (slices: Slice[]) => {
  slices.forEach((slice) => {
    slicesSet.add(slice);
  });

  let slicesTemp: Record<string, Reducer<any>> = {};

  Array.from(slicesSet).forEach(sl => {
    slicesTemp[sl.name] = sl.reducer;
  })

  store.replaceReducer(
    combineReducers({
      ...Array.from(slicesSet).reduce(
        (acc, slice) => {
          acc[slice.name] = slice.reducer;
          return acc;
        },
        {} as Record<string, any>,
      )
    }),
  );
};