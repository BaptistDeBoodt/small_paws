// useAdminUpdateUser.ts
import { supabase } from '@utils/supabase';
import UserProfile from '@typefiles/UserProfile';

const useAdminUpdateUser = () => {
  const updateUser = async (id: string, updates: Partial<UserProfile>) => {
    const { error } = await supabase
      .from('Users')
      .update(updates)
      .eq('id', id);

    if (error) throw new Error(error.message);
  };

  return { updateUser };
};

export default useAdminUpdateUser;
