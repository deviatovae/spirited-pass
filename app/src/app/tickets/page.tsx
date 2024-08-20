'use client';
import { Station } from './components/Station';
import { useEffect, useState } from 'react';
import { Back } from '@/components/Back';

export type Destination = {
  name: string;
  image: string;
};

export default function Stations() {
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const destinations = [
    { name: 'Bath House', image: '/images/bathhouse.png' },
    { name: 'Swamp Beach', image: '/images/beach.webp' },
    { name: 'Swamp Bottom', image: '/images/swampBottom.jpg' },
  ];
  const handleSelect = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  useEffect(() => {
    console.log(selectedDestination);
  }, [selectedDestination]);

  return (
    <>
      <div className="absolute inset-0 bg-white/35 z-10" />
      <div className="absolute inset-0 bg-[url('/images/rail.jpg')] bg-cover bg-center"></div>
      <div className="relative z-20 flex flex-col items-center h-full">
        <Back />
        <span className="text-3xl mb-3 inline-flex">AVAILABLE TICKETS</span>
        <div className="flex gap-2">
          {destinations.map((d) => (
            <Station
              key={d.name}
              name={d.name}
              destinationImg={d.image}
              onClick={() => handleSelect(d)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
