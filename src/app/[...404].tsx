import { Redirect } from 'expo-router';
import { supabase } from '@utils/supabase';
import { useEffect, useState } from 'react';

export default function NotFoundRedirect() {
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        setRedirectTo('./Index');
      } else {
        setRedirectTo('/pages/Auth'); // of waar je Auth staat
      }
    };

    checkSession();
  }, []);

  if (!redirectTo) return null;

  return <Redirect href={redirectTo} />;
}
