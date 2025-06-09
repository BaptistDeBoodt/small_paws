// @hooks/Shifts/useDeleteShift.ts
import { supabase } from '@utils/supabase';
import { useRouter } from 'expo-router';

const useDeleteShift = () => {
  const router = useRouter();

  const deleteShift = async (shiftId: string) => {
    const { error } = await supabase
      .from('Shifts')
      .delete()
      .eq('id', shiftId);

    if (error) {
      console.error('Error deleting shift:', error.message);
      throw new Error(error.message);
    }

    // Redirect or notify
    router.push('/pages/Reservations')
  };

  return { deleteShift };
};

export default useDeleteShift;
