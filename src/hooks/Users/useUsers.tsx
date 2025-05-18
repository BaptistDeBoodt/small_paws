// import { useEffect, useState } from 'react';
// import { supabase } from '@utils/supabase';
// import UserProfile from '@typefiles/UserProfile';

// const useUsers = () => {
//   const [volunteers, setVolunteers] = useState<UserProfile[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchVolunteers = async () => {
//       try {
//         const { data: usersData, error: usersError } = await supabase
//           .from('Users')
//           .select('id, first_name, last_name, phone, birthdate, level, role');

//         if (usersError || !usersData) {
//           throw usersError || new Error('Gebruikers niet gevonden');
//         }

//         const { data: authUsersData, error: authError } = await supabase
//           .from('auth.users')
//           .select('id, email');

//         if (authError || !authUsersData) {
//           throw authError || new Error('Auth gebruikers niet gevonden');
//         }

//         const mergedUsers: UserProfile[] = usersData.map(user => {
//           const authUser = authUsersData.find(auth => auth.id === user.id);
//           return {
//             ...user,
//             email: authUser?.email ?? '',
//           };
//         });

//         setVolunteers(mergedUsers);
//         console.log('✅ [useUsers] Volunteers fetched and merged:', mergedUsers);
//       } catch (err: any) {
//         console.error('❌ [useUsers] Error fetching users:', err.message);
//         setError(err.message);
//         setVolunteers([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVolunteers();
//   }, []);

//   return { volunteers, loading, error };
// };

// export default useUsers;


import { useEffect, useState } from 'react';
import { supabase } from '@utils/supabase';
import UserProfile from '@typefiles/UserProfile';

const useUsers = () => {
  const [volunteers, setVolunteers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const { data, error } = await supabase
          .from('full_users')
          .select('id, first_name, last_name, phone, birthdate, email, level, role');

        if (error) {
          throw error;
        }

        setVolunteers(data || []);
        console.log('✅ [useUsers] Volunteers fetched from view:', data);
      } catch (err: any) {
        console.error('❌ [useUsers] Error fetching full_users view:', err.message);
        setError(err.message);
        setVolunteers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  return { volunteers, loading, error };
};

export default useUsers;