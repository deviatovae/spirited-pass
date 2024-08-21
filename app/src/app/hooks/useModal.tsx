import { useCallback, useState } from 'react';

export const useModal = () => {
  const [isOpen, setOpen] = useState(false);
  console.log(isOpen);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const Modal = useCallback(
    ({ children }: { children: JSX.Element }) =>
      isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            {children}
          </div>
        </div>
      ),
    [isOpen],
  );

  return { Modal, openModal, closeModal };
};
