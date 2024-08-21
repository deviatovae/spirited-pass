'use client';
import React, { createContext, useContext, ReactNode } from 'react';
import { useAvailableTrain } from '../hooks/useAvailableTrain';

type TrainContextType = ReturnType<typeof useAvailableTrain>;

const TrainContext = createContext<TrainContextType | undefined>(undefined);

export const TrainProvider = ({ children }: { children: ReactNode }) => {
  const availableTrain = useAvailableTrain();

  return (
    <TrainContext.Provider value={availableTrain}>
      {children}
    </TrainContext.Provider>
  );
};

export const useTrain = (): TrainContextType => {
  const context = useContext(TrainContext);
  if (!context) {
    throw new Error('useTrain must be used within a TrainProvider');
  }
  return context;
};
