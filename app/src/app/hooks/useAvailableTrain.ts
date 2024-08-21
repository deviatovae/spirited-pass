import { api } from '@/api/api';
import { formatDate, differenceInSeconds } from 'date-fns';
import { useState, useMemo, useEffect } from 'react';
import useSWR from 'swr';

export const useAvailableTrain = () => {
  const { isLoading, data, mutate } = useSWR('train', () => api.get('/train'));

  const [departureAfter, setDepartureAfter] = useState<number | null>(null);
  const remainingTime = useMemo(
    () => formatDate(new Date(0).setSeconds(departureAfter ?? 0), 'm:ss'),
    [departureAfter],
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    setDepartureAfter(differenceInSeconds(data.departureAt, new Date()));
    const id = setInterval(
      () => setDepartureAfter((prev) => Math.max(0, (prev ?? 0) - 1)),
      1000,
    );

    return () => clearInterval(id);
  }, [data]);

  useEffect(() => {
    if (departureAfter === 0) {
      mutate();
    }
  }, [departureAfter, mutate]);

  return { isLoading, data, remainingTime };
};
