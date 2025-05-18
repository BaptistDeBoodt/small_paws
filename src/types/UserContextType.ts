import UserProfile from '@typefiles/UserProfile';

interface UserContextType {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export type { UserContextType };
