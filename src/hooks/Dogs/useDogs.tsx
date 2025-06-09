import { useEffect, useState } from 'react';
import { supabase } from '@utils/supabase';
import { DogProfileProps } from '@typefiles/DogProfileProps';

const useDogs = () => {
  const [dogs, setDogs] = useState<DogProfileProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDogs = async () => {
      const { data, error } = await supabase
        .from('Dogs')
        .select(`
          id,
          name,
          breed,
          birthdate,
          sex,
          level,
          image,
          adopted
        `);

      if (error) {
        setError(error.message);
        setDogs([]);
      } else {
        setDogs(data || []);
      }

      setLoading(false);
    };

    console.log('🐶 [useDog] Dogs fetched:');

    fetchDogs();
  }, []);

  return { dogs, loading, error };
};

export default useDogs;
