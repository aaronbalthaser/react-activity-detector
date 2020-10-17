import React, { ReactElement, useContext } from 'react';

import ActivityDetector from './ActivityDetector';

const ActivityDetectorContext = React.createContext<ActivityDetector>(
  undefined
);

interface Props {
  children: ReactElement;
  init?: boolean;
}

export const ActivityDetectorProvider: React.FC<Props> = ({
  children,
  init,
}) => {
  const [timer, initTimer] = React.useState<ActivityDetector>();

  React.useEffect(() => {
    initTimer(new ActivityDetector({ init: init }));
  }, []);

  return (
    <ActivityDetectorContext.Provider value={timer}>
      {children}
    </ActivityDetectorContext.Provider>
  );
};

export const useActivityDetectorContext = (): ActivityDetector =>
  useContext(ActivityDetectorContext);
