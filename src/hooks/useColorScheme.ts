
import { useState, useEffect } from 'react';

export type ColorScheme = 'A' | 'B' | 'C';

export const useColorScheme = () => {
  const [scheme, setScheme] = useState<ColorScheme>('A');

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all scheme classes
    root.classList.remove('scheme-a', 'scheme-b', 'scheme-c');
    
    // Add current scheme class
    root.classList.add(`scheme-${scheme.toLowerCase()}`);
  }, [scheme]);

  return { scheme, setScheme };
};
