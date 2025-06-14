import BadgeCard from '@components/BadgeCard';
import Button from '@components/Button';
import Loading from '@components/Loading';
import ProfileCard from '@components/ProfileCard';
import useUser from '@hooks/Users/useUser';
import PageLayout from '@layout/PageLayout';
import { globalStyles } from '@styles/globalStyles';
import { supabase } from '@utils/supabase';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';

const Profile = () => {
  const { profile, loading, error } = useUser();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    queryClient.clear()
    router.replace('/pages/Auth');
    if (error) {
      console.error('Logout error:', error.message);
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <View style={globalStyles.loadingContainer}>
          <Loading />
        </View>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Text style={globalStyles.pageTitle}>Profiel</Text>
      <View style={globalStyles.section}>
      {profile && (  
        <ProfileCard
          first_name={profile.first_name}
          last_name={profile.last_name}
          phone={profile.phone}
          email={profile.email}
          birthdate={profile.birthdate}
          level={profile.level}
          image={profile.image}
        />
      )}
      </View>
      <View style={globalStyles.section}>
      {profile && ( 
        <BadgeCard level={profile.level} />
      )}
      </View>
      <View style={globalStyles.section}>
        <Button title="Uitloggen" onPress={handleLogout} />
      </View>
    </PageLayout>
  );
};

export default Profile;
