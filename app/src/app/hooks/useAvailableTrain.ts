import { api } from '@/api/api';
import { differenceInSeconds, format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

export const useAvailableTrain = () => {
  const { isLoading, data, mutate } = useSWR('train', () =>
    api.get('/api/train'),
  );

  const [departureAfter, setDepartureAfter] = useState<number | null>(null);
  const remainingTime = useMemo(
    () =>
      format(new Date(0).setSeconds(Math.max(0, departureAfter ?? 0)), 'm:ss'),
    [departureAfter],
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    setDepartureAfter(differenceInSeconds(data.departureAt, new Date()));
    const id = setInterval(
      () => setDepartureAfter((prev) => (prev ?? 0) - 1),
      1000,
    );

    return () => clearInterval(id);
  }, [data]);

  useEffect(() => {
    // refetch with 1s delay
    if (departureAfter === -1) {
      mutate();
    }
  }, [departureAfter, mutate]);

  return { isLoading, data, remainingTime, mutate };
};
