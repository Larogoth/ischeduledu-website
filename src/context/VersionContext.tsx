
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Version = 'a' | 'b';

interface VersionContextType {
  version: Version;
  setVersion: (version: Version) => void;
}

const VersionContext = createContext<VersionContextType | undefined>(undefined);

export const VersionProvider = ({ children }: { children: ReactNode }) => {
  const [version, setVersionState] = useState<Version>('a');

  useEffect(() => {
    const storedVersion = localStorage.getItem('app_version') as Version;
    if (storedVersion && ['a', 'b'].includes(storedVersion)) {
      setVersionState(storedVersion);
    }
  }, []);

  const setVersion = (newVersion: Version) => {
    localStorage.setItem('app_version', newVersion);
    setVersionState(newVersion);
    // Force a re-render by reloading the page to ensure all components update
    window.location.reload();
  };

  return (
    <VersionContext.Provider value={{ version, setVersion }}>
      {children}
    </VersionContext.Provider>
  );
};

export const useVersion = () => {
  const context = useContext(VersionContext);
  if (context === undefined) {
    throw new Error('useVersion must be used within a VersionProvider');
  }
  return context;
};
