'use client';
import { useAvailableTrain } from '@/app/hooks/useAvailableTrain';
import Image from 'next/image';
import Link from 'next/link';
import { Loader } from '../components/Loader';

export default function Home() {
  const { isLoading, data, remainingTime } = useAvailableTrain();

  return (
    <>
      <Loader isLoading={isLoading}>
        <span className="text-2xl">
          Hurry! The train #{data?.id} leaves in {remainingTime} minutes
        </span>
        <span className="text-lg">
          Available tickets for this ride: {data?.availableTickets}
        </span>
        <Image
          src="/images/train.gif"
          alt=""
          width={400}
          height={300}
          priority
          className="rounded-lg"
        />
        <Link
          href="/tickets"
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Obtain your Spirit Pass
          </span>
        </Link>
      </Loader>
    </>
  );
}
