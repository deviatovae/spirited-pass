import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Props = {
  children: JSX.Element | JSX.Element[];
  isLoading: boolean;
};

export const Loader = ({ isLoading, children }: Props) => {
  const [show, setShow] = useState(!isLoading);
  const useLoader = useRef(isLoading);

  useEffect(() => {
    if (isLoading) {
      setShow(false);
    } else {
      const timeoutId = setTimeout(() => setShow(true), 250);
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);

  return (
    <>
      {!show && (
        <div className={isLoading ? '' : 'animate-fadeOut`'}>
          <Image
            src="/images/hamsterLoader.gif"
            alt="Loading"
            width={200}
            height={200}
            priority
          />
        </div>
      )}
      {show && (
        <div
          className={`${useLoader.current ? 'animate-fadeIn duration-500' : ''} flex min-h-screen flex-col items-center gap-4 p-4 md:p-16`}
        >
          {children}
        </div>
      )}
    </>
  );
};
