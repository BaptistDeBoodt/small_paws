import { useState } from 'react';
import { supabase } from '@utils/supabase';
import { ShiftTypeProps } from '@typefiles/ShiftTypeProps';

export default function useAddShift() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addShift = async (shift: ShiftTypeProps): Promise<boolean> => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.from('Shifts').insert([shift]);

    if (error) {
      setError(error.message);
      setLoading(false);
      return false;
    }

    setLoading(false);
    return true;
  };

  return { addShift, loading, error };
}
