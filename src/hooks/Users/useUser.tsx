import { useEffect, useState } from 'react';
import { supabase } from '@utils/supabase';
import UserProfile from '@typefiles/UserProfile';

const useUser = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        setError(sessionError?.message || 'Geen sessie gevonden');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('Users')
        .select('first_name, last_name, phone, birthdate, level, role')
        .eq('id', session.user.id)
        .single();

      if (error || !data) {
        setError(error?.message || 'Geen data gevonden');
        setLoading(false);
        return;
      }

      setProfile({ 
        first_name: data.first_name ?? '', 
        last_name: data.last_name ?? '', 
        email: session.user.email ?? '', 
        phone: data.phone ?? '', 
        birthdate: data.birthdate ?? '',
        level: data.level ?? 0,
        role: data.role ?? 0
      });

      console.log('👨 [useUser] User profile fetched successfully:');

      setLoading(false);
    };

    fetchUserData();
  }, []);

  return { profile, loading, error };
};

export default useUser;
