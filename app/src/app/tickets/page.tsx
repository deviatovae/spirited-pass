'use client';
import { api, serverApiURL } from '@/api/api';
import { Back } from '@/components/Back';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Station } from './components/Station';

export type Destination = {
  name: string;
  image: string;
};

export default function Stations() {
  const { data: stations } = useSWR('stations', () => api.get('/station'));
  const [stationId, setStationId] = useState<number | null>(null);

  useEffect(() => {
    console.log(stationId);
  }, [stationId]);

  return (
    <>
      <div className="absolute inset-0 bg-white/35 z-10" />
      <div className="absolute inset-0 bg-[url('/images/rail.jpg')] bg-cover bg-center"></div>
      <div className="relative z-20 flex flex-col items-center h-full">
        <Back />
        <span className="text-3xl mb-3 inline-flex">AVAILABLE TICKETS</span>
        <div className="flex gap-2">
          {stations?.map(({ id, name, image }) => (
            <Station
              key={id}
              name={name}
              destinationImg={serverApiURL + image}
              onClick={() => setStationId(id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
