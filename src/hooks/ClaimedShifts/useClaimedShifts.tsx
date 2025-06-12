import { supabase } from '@utils/supabase'
import { useEffect, useState } from 'react'
import { ClaimedShifts } from '@typefiles/ClaimedShifts';

const useClaimedShifts = () => {
  const [claimedShifts, setClaimedShifts] = useState<ClaimedShifts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaimedShifts = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('Gebruiker niet ingelogd:', userError?.message);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('Claimed_shifts')
        .select('shift_id, Shifts(*, Dogs(id, name, healthy))')
        .eq('user_id', user.id);

      if (error) {
        console.error('Fout bij ophalen van shifts:', error.message);
      } else {
        setClaimedShifts(data);
      }

      setLoading(false);
    };

    fetchClaimedShifts();
  }, []);

    return { claimedShifts, loading };
}

export default useClaimedShifts;