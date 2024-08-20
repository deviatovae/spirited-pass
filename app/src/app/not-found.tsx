import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2 className="text-center text-xl mb-1">
        Oops! This page doesn&apos;t exist.
      </h2>
      <Image src="/hamster.gif" alt="error" width={480} height={480}></Image>
      <Link className="pt-4 text-cyan-500 text-2xl block text-center" href="/">
        Return Home
      </Link>
    </div>
  );
}
