import { useEffect, useState } from 'react';
import { supabase } from '@utils/supabase';
import UserProfile from '@typefiles/UserProfile';

const useUsers = (enabled = true) => {
  const [volunteers, setVolunteers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const fetchVolunteers = async () => {
      setLoading(true);
      console.log('de admin is ingelogd')
      try {
        const { data, error } = await supabase
          .from('Users')
          .select('id, first_name, last_name, phone, birthdate, level, role, image');

        if (error) throw error;
        setVolunteers(data || []);
        console.log('🤡 [useUsers] Users profile fetched successfully:');
      } catch (err: any) {
        console.error('❌ [useUsers] Error:', err.message);
        setError(err.message);
        setVolunteers([]);
      } finally {
        setLoading(false);
      }
    };

  fetchVolunteers();
}, [enabled]);

  return { volunteers, loading, error };
};

export default useUsers
