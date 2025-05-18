import { useState } from 'react';
import { supabase } from '@utils/supabase';
import { DogProfileProps } from '@typefiles/DogProfileProps';

export default function useAddDog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addDog = async (dog: DogProfileProps): Promise<boolean> => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.from('Dogs').insert([dog]);

    if (error) {
      setError(error.message);
      setLoading(false);
      return false;
    }

    console.log('🐶 [useAddDog] Dog added successfully:');

    setLoading(false);
    return true;
  };

  return { addDog, loading, error };
}
