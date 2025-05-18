import { supabase } from '@utils/supabase';
import UserProfile from '@typefiles/UserProfile';

const useUpdateUser = () => {
  const updateProfile = async (profile: UserProfile) => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (!session?.user) throw new Error(sessionError?.message || 'Geen sessie');

    const { error } = await supabase
      .from('Users')
      .update({
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
        birthdate: profile.birthdate,
      })
      .eq('id', session.user.id);

    if (error) throw new Error(error.message);
  };

  return { updateProfile };
};

export default useUpdateUser;
