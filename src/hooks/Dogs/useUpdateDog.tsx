import { supabase } from '@utils/supabase';
import { DogProfileProps } from '@typefiles/DogProfileProps'; // Zorg dat je een Dog type hebt gedefinieerd

const useUpdateDog = () => {
  const updateDog = async (id: string, dog: Partial<DogProfileProps>) => {
    if (!id) throw new Error('Geen geldig hond-id');

    const { error } = await supabase
      .from('Dogs')
      .update({
        name: dog.name,
        breed: dog.breed,
        birthdate: dog.birthdate,
        sex: dog.sex,
        level: dog.level,
        reference: dog.reference,
        image: dog.image,
        description: dog.description,
      })
      .eq('id', id);

    if (error) throw new Error(error.message);
  };

  return { updateDog };
};

export default useUpdateDog;
