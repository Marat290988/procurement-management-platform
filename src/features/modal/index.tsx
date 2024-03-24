import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';

export const useModal = () => {

  const [isShow, setIsShow] = useState(false);
  let tempFunc: (parametr: any) => void | undefined;
  let portalContainer = document.querySelector('body>[data-portal]');

  if (!portalContainer) {
    portalContainer = document.createElement('div');
    portalContainer.setAttribute('data-portal', '');
    document.body.appendChild(portalContainer);
  }

  const hideModal = (parametr?: any) => {
    setIsShow(false);
    // if (afterClose !== undefined) {
    //   afterClose(parametr);
    // }
  }

  const openModal = () => {
    setIsShow(true);
    // return {
    //   afterClose: (func: (parametr?: any) => void) => {
    //     tempFunc = func;
    //   }
    // }
  }

  // const afterClose = useCallback<(parametr: any) => void>(() => {
  //   if (tempFunc !== undefined) {
  //     return tempFunc;
  //   }
  // }, [isShow]);

  useEffect(() => {
    if (isShow) {
      ReactDOM.createRoot(portalContainer!).render(
        <>
          {isShow && (
            <div
              className={clsx('h-screen w-screen bg-[#2b415754] fixed top-0 flex items-center justify-center')}
              style={{zIndex: getMaxZIndex()}}
              onClick={hideModal}
            >
            </div>
          )}
        </>
      )
    } else {
      ReactDOM.createRoot(portalContainer!).render(<></>);
    }
  }, [isShow])

  return {
    hideModal, openModal
  }

}

const getMaxZIndex = (): number => {
  let zIndex = 1;
  Array.from(document.querySelectorAll("body>[data-portal]>*")).forEach(
    el => {
      zIndex = 
        +window.getComputedStyle(el).getPropertyValue("z-index") > zIndex ?
        +window.getComputedStyle(el).getPropertyValue("z-index") :
        zIndex + 1
    }
  );
  return zIndex;
}