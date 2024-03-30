import clsx from "clsx";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import ReactDOM from 'react-dom/client';

export const useModal = () => {

  const [isShow, setIsShow] = useState(false);
  let portalContainer = document.querySelector('body>[data-portal]');

  if (!portalContainer) {
    portalContainer = document.createElement('div');
    portalContainer.setAttribute('data-portal', '');
    document.body.appendChild(portalContainer);
  }

  const childRef = useRef<{ childMethod: () => void } | null>(null);
  const afterCloseFuncRef = useRef<{func: ((data?: any) => void) | null}>({func: null});
  const setAfterCloseFunc = (func: (data?: any) => void) => {
    afterCloseFuncRef.current.func = func;
    //useImperativeHandle(afterCloseFuncRef, () => (func));
  };

  const [componentParametr, setComponentParametr] = useState(<div>Nothing was handed over</div>);

  const hideModal = (data?: any) => {
    if (childRef.current) {
      childRef.current.childMethod();
      setIsShow(false);
      if (afterCloseFuncRef.current.func !== null) {
        afterCloseFuncRef.current.func(data);
      }
    }
  }

  const openModal = (innerComponent: JSX.Element) => {
    setIsShow(true);
    setComponentParametr(innerComponent);
    return {
      afterClose: setAfterCloseFunc
    };
  }

  const ModalJSX = forwardRef<{childMethod: () => void}, {injectedComponent: JSX.Element}>((props, ref) => {
    const [modalIsShow, setModalIsShow] = useState(true);

    const hideModalJSX = () => {
      setModalIsShow(false);
    }

    useImperativeHandle(ref, () => ({
      childMethod: hideModalJSX
    }));

    return <>
      {modalIsShow && (
        <div
          className={clsx('h-screen w-screen bg-[#2b415754] fixed top-0 flex items-center justify-center')}
          style={{zIndex: getMaxZIndex()}}
          onClick={() => hideModal()}
        >
          {props.injectedComponent && props.injectedComponent}
        </div>
      )}
    </>;
  })

  let root = useRef<ReactDOM.Root | null>(null);

  useEffect(() => {
    if (root.current === null && portalContainer && portalContainer.children.length === 0) {
      root.current = ReactDOM.createRoot(portalContainer!);
    }
    if (isShow && portalContainer && portalContainer.children.length === 0) {
      root.current!.render(<><ModalJSX injectedComponent={componentParametr} ref={childRef} /></>);
    } else if (!isShow && portalContainer && portalContainer.children.length > 0) {
      root.current!.unmount();
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