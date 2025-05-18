import { useState } from 'react';
import { supabase } from '@utils/supabase';
import { Alert } from 'react-native';

const useUpdateShift = () => {
  const [loading, setLoading] = useState(false);

  const updateShift = async (shiftId: number, updatedData: any) => {
    setLoading(true);
    console.log('📝 [ShiftEdit] Updated Data:');

    const { error, data } = await supabase
      .from('Shifts')
      .update(updatedData)
      .eq('id', shiftId)
      .select(); // Add .select() to see what comes back

    setLoading(false);

    if (error) {
      console.error('🔥 Supabase Full Error:', error);
      Alert.alert('Fout', error.message || 'Onbekende fout bij het updaten.');
      return false;
    }

    console.log('✅ Supabase Update Success:');
    return true;
  };

  return { updateShift, loading };
};

export default useUpdateShift;
