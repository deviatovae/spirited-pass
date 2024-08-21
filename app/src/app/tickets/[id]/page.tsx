'use client';
import { api } from '@/api/api';
import { useModal } from '@/app/hooks/useModal';
import NotFound from '@/app/not-found';
import { Loader } from '@/components/Loader';
import { ReturnHome } from '@/components/ReturnHome';
import Image from 'next/image';
import useSWR from 'swr';
import { TicketForm } from '../components/TicketForm';

export default function TicketPreview({ params }: { params: { id: string } }) {
  const { openModal, closeModal, Modal } = useModal();

  const { data: ticket, isLoading } = useSWR('ticket', () =>
    api.get('/api/ticket/{id}', { path: { id: parseInt(params.id, 10) } }),
  );

  const onSubmit = async (name: string): Promise<boolean> => {
    if (!ticket) {
      return false;
    }

    const t = await api.patch('/api/ticket/{id}', {
      path: { id: parseInt(params.id, 10) },
      body: { name },
    });

    Object.assign(ticket, t);
    closeModal();
    return true;
  };

  if (!ticket) {
    return <NotFound />;
  }

  return (
    <Loader isLoading={isLoading}>
      <Modal>
        <TicketForm
          onClose={closeModal}
          onSubmit={onSubmit}
          name={ticket.name}
        />
      </Modal>
      <div className="flex bg-white border-2 border-[#d4a373] rounded-lg p-4 shadow-lg gap-2">
        <div className="min-w-24">
          <Image
            src="/images/ticket.webp"
            alt="Ticket Image"
            width={150}
            height={250}
            priority
            style={{ width: 'auto', height: 'auto', maxWidth: '150px' }}
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Train #{ticket.trainId}
            </h2>
            <p className="text-gray-600 truncate max-w-52">
              Ticket #{ticket.id}
            </p>
            <p className="text-gray-600 truncate max-w-52">
              Destination: {ticket.station.name}
            </p>
            <p className="text-gray-600 truncate max-w-52">
              Name: {ticket.name}
            </p>
          </div>
          <div className="flex self-end mt-4 ">
            <button
              className="bg-[#d4a373] hover:bg-[#4f4842] text-white py-2 px-4 rounded"
              onClick={openModal}
            >
              Change Name
            </button>
          </div>
        </div>
      </div>
      <ReturnHome />
    </Loader>
  );
}
