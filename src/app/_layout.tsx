import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import PageLayout from '@layout/PageLayout';
import Loading from '@components/Loading';
import { supabase } from '@utils/supabase';
import { globalStyles } from '@styles/styles';
import Auth from '@pages/Auth';
import { UserProvider } from '@context/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


export default function RootLayout() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Session fetch error:', error);
      } else {
        console.log('Session on load:', data?.session);
      }
      setSession(data?.session ?? null);
      setLoading(false);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', session);
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <PageLayout>
        <View style={globalStyles.loadingContainer}>
          <Loading />
        </View>
      </PageLayout>
    );
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <QueryClientProvider client={queryClient}>
    <UserProvider initialSession={session}>
      <View key={session?.user?.id ?? 'no-session'} style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </UserProvider>
  </QueryClientProvider>
  );
}
