import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@utils/supabase';
import UserProfile from '@typefiles/UserProfile';
import { UserContextType } from '@typefiles/UserContextType';

const UserContext = createContext<UserContextType>({
  profile: null,
  loading: true,
  error: null,
});

interface UserProviderProps {
  children: React.ReactNode;
  initialSession: any;
}

export const UserProvider = ({ children, initialSession }: UserProviderProps) => {
  const userId = initialSession?.user?.id ?? null;
  const email = initialSession?.user?.email ?? '';

  const {
    data: profile,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (!userId) throw new Error('Geen actieve sessie');

      const { data, error } = await supabase
        .from('Users')
        .select('first_name, last_name, phone, birthdate, level, role')
        .eq('id', userId)
        .single();

      if (error || !data) throw error || new Error('Geen gebruikersdata gevonden');

      const profileData: UserProfile = {
        first_name: data.first_name ?? '',
        last_name: data.last_name ?? '',
        email,
        phone: data.phone ?? '',
        birthdate: data.birthdate ?? '',
        level: data.level ?? 0,
        role: data.role ?? 0
      };

      return profileData;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  return (
    <UserContext.Provider value={{ profile, loading, error: error?.message ?? null }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
