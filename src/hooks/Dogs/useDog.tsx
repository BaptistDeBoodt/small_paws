import { useEffect, useState } from 'react';
import { supabase } from '@utils/supabase';
import { DogProfileProps } from '@typefiles/DogProfileProps';

const useDog = (id: string) => {
  const [dog, setDog] = useState<DogProfileProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDog = async () => {
      if (!id || Array.isArray(id)) return;

      const { data, error } = await supabase
        .from('Dogs')
        .select(`
          name,
          sex,
          birthdate,
          breed,
          level,
          reference,
          description, 
          image,
          healthy,
          adopted
        `)
        .eq('id', id)
        .single();

      if (error) {
        setError(error.message);
        setDog(null);
      } else {
        setDog(data);
      }

      setLoading(false);
    };

    fetchDog();
  }, [id]);

  return { dog, loading, error };
};

export default useDog;