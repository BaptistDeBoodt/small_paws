import { useState } from 'react';
import { supabase } from '@utils/supabase';
import { Alert } from 'react-native';
import UserProfile from '@typefiles/UserProfile'

const useAddUser = () => {
  const [loading, setLoading] = useState(false);

  const addUser = async ({ email, password, first_name, last_name }: UserProfile) => {
    setLoading(true);

    // Stap 1: Maak gebruiker aan in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      Alert.alert("Fout bij aanmaken gebruiker", authError.message);
      setLoading(false);
      return { success: false };
    }

    const userId = authData?.user?.id;

    // Stap 2: Voeg gebruiker toe aan "Users" tabel
    const { error: dbError } = await supabase.from('Users').insert({
      id: userId,
      first_name,
      last_name,
      role: 0,
      level: 1,
    });

    if (dbError) {
      Alert.alert("Fout bij toevoegen in tabel", dbError.message);
      setLoading(false);
      return { success: false };
    }

    Alert.alert("Succes", "Vrijwilliger succesvol toegevoegd!");
    setLoading(false);
    return { success: true };
  };

  return { addUser, loading };
};

export default useAddUser;
