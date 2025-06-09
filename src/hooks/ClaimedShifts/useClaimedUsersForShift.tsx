// hooks/Shifts/useClaimedUsersForShift.ts
import { useEffect, useState } from 'react';
import { supabase } from '@utils/supabase';

type ClaimedUser = {
  user: {
    id: string;
    first_name: string;
    last_name: string;
  };
};

const useClaimedUsersForShift = (shiftId: string | null) => {
  const [users, setUsers] = useState<ClaimedUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shiftId) return;

    const fetchUsers = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('Claimed_shifts')
        .select(`
            user:Users
            (
                id,
                first_name,
                last_name
            )`
        )
        .eq('shift_id', shiftId);

      if (error) {
        console.error('Fout bij ophalen van gebruikers voor shift:', error.message);
      } else {
        setUsers(data);
      }

      setLoading(false);
    };

    fetchUsers();
  }, [shiftId]);

  return { users, loading };
};

export default useClaimedUsersForShift;
