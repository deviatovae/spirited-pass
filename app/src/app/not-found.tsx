import { ReturnHome } from '@/components/ReturnHome';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div>
      <h2 className="text-center text-xl mb-1">
        Oops! This page doesn&apos;t exist.
      </h2>
      <Image src="/hamster.gif" alt="error" width={480} height={480}></Image>
      <ReturnHome />
    </div>
  );
}
