import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://oieaoeffkmsckdyywtsc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pZWFvZWZma21zY2tkeXl3dHNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MDc0NDIsImV4cCI6MjA2MzQ4MzQ0Mn0.NxkNFLnnQgJfzaeltQhh7CO_GhOHRDUH9BcBjMVEtMM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
