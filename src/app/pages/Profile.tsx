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

const Profile = () => {
  const { profile, loading, error } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/pages/Auth');
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
