import React, { ReactNode } from 'react';
import { ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastProviderProps = {
  children: ReactNode;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const toastOptions: ToastOptions = {
    position: 'top-right',
    autoClose: 3000,
    closeOnClick: true,
  };

  return (
    <>
      {children}
      <ToastContainer {...toastOptions} />
    </>
  );
};
