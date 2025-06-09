import { useEffect, useState } from 'react';
import { supabase } from '@utils/supabase';
import { ShiftTypeProps } from '@typefiles/ShiftTypeProps';

const useShifts = () => {
  const [shifts, setShifts] = useState<ShiftTypeProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShifts = async () => {
      const { data, error } = await supabase
        .from('Shifts')
        .select(`
          id,
          type,
          start_time,
          end_time,
          shift_date,
          request,
          label,
          crew,
          Dogs (
            id,
            name,
            healthy
          )
        `);

      if (error) {
        setError(error.message);
        setShifts([]);
      } else {
        setShifts(data || []);
      }

      setLoading(false);
    };

    console.log('🕒 [useShifts] Shifts fetched:');

    fetchShifts();
  }, []);

  return { shifts, loading, error };
};

export default useShifts;