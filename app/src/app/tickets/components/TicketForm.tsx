import { FormEvent, useEffect, useRef, useState } from 'react';

type Props = {
  onClose: VoidFunction;
  onSubmit: (name: string) => Promise<boolean>;
  name?: string;
};
export const TicketForm = ({ onClose, onSubmit, name }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(name ?? '');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (await onSubmit(value)) {
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="w-full bg-white border-2 border-[#d4a373] flex flex-col gap-3 p-2">
        <div className="text-center text-[#d4a373] text-3xl">
          <span>滋養</span>
        </div>
        <input
          type="text"
          ref={inputRef}
          value={value}
          placeholder="Enter your name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
          }}
          className="text-center border-gray-300 rounded-md focus:border-[#d4a373] focus:ring-[#d4a373] focus:ring-opacity-50 focus:outline-none text-xl"
          required
        />
        <div className="text-center text-[#d4a373] text-3xl">
          <span>一名様限り</span>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#d4a373] hover:bg-[#4f4842] text-white rounded-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
