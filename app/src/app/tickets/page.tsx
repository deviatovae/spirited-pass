'use client';
import { api, serverApiURL } from '@/api/api';
import { Back } from '@/components/Back';
import { Loader } from '@/components/Loader';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { useModal } from '../hooks/useModal';
import { useTrain } from '../providers/TrainProvider';
import { Station } from './components/Station';
import { TicketForm } from './components/TicketForm';

export default function Stations() {
  const router = useRouter();
  const { data: stations, isLoading: isStationLoading } = useSWR(
    'stations',
    () => api.get('/api/station'),
  );
  const {
    data: train,
    remainingTime,
    mutate: mutateTrain,
    isLoading: isTrainLoading,
  } = useTrain();

  const [stationId, setStationId] = useState<number | null>(null);
  const { openModal, closeModal, Modal } = useModal();

  const onSubmit = async (name: string): Promise<boolean> => {
    if (!stationId || !train?.id) {
      return false;
    }

    const ticket = await api.post('/api/ticket', {
      body: { name, stationId: stationId, trainId: train.id },
    });
    toast.success('Spirit Pass successfully created!');

    mutateTrain();
    closeModal();
    router.push(`/tickets/${ticket.id}`);

    return true;
  };

  const handleCreateTicket = (id: number) => {
    setStationId(id);
    openModal();
  };

  return (
    <Loader isLoading={isTrainLoading || isStationLoading}>
      <Modal>
        <TicketForm onClose={closeModal} onSubmit={onSubmit} />
      </Modal>
      <div className="absolute inset-0 bg-white/35 z-10" />
      <div className="absolute inset-0 bg-[url('/images/rail.jpg')] bg-cover bg-center" />
      <div className="relative z-20 flex flex-col">
        <div className="flex justify-between">
          <Back />
          <div className="flex text-lg">
            <div>train leaves in:</div>
            <div className="w-12 text-right">{remainingTime}</div>
          </div>
        </div>
        <div className="flex justify-end text-lg">
          <span>tickets left: {train?.availableTickets}</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1 justify-center">
          {stations?.map(({ id, name, image }) => (
            <Station
              key={id}
              name={name}
              destinationImg={serverApiURL + image}
              onClick={() => handleCreateTicket(id)}
            />
          ))}
        </div>
      </div>
    </Loader>
  );
}
