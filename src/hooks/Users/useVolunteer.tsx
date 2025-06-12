import { useEffect, useState } from 'react';
import { supabase } from '@utils/supabase';
import UserProfile from '@typefiles/UserProfile';

const useVolunteer = (id: string) => {
  const [volunteer, setVolunteer] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVolunteer = async () => {
      if (!id || Array.isArray(id)) return;

      const { data, error } = await supabase
        .from('Users')
        .select('first_name, last_name, birthdate, role, level, image')
        .eq('id', id)
        .single();

      if (error) {
        setError(error.message);
        setVolunteer(null);
      } else {
        setVolunteer(data);
      }

      setLoading(false);
    };

    fetchVolunteer();
  }, [id]);

  return { volunteer, loading, error };
};

export default useVolunteer;