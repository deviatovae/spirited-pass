import { useRouter } from 'next/navigation';

export const Back = () => {
  const router = useRouter();

  return (
    <div
      className="flex mr-auto items-center gap-1 cursor-pointer text-xl"
      onClick={() => router.back()}
    >
      <span className="text-3xl">←</span>
      <span>Back</span>
    </div>
  );
};
