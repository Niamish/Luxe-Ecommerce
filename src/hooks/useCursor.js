import { useContext } from 'react';
import CursorContext from '../context/CursorContext';

// A custom hook to simplify using the cursor context.
export const useCursor = () => {
  const context = useContext(CursorContext);

  // This error ensures the hook is used correctly inside the provider.
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }

  return context;
};
