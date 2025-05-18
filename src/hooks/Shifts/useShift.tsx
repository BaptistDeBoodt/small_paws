import { useEffect, useState } from 'react';
import { supabase } from '@utils/supabase';
import { ShiftTypeProps } from '@typefiles/ShiftTypeProps';

const useShift = (id: string) => {
  const [shift, setShift] = useState<ShiftTypeProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShift = async () => {
      if (!id || typeof id !== 'string') return;

      const { data, error } = await supabase
        .from('Shifts')
        .select(`
          type,
          start_time,
          end_time,
          shift_date,
          label,
          request,
          crew,
          Dogs (
            id,
            name
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        setError(error.message);
        setShift(null);
      } else {
        setShift(data);
      }

      console.log('🕒 [useShift] Shift fetched:');

      setLoading(false);
    };

    fetchShift();
  }, [id]);

  return { shift, loading, error };
};

export default useShift;