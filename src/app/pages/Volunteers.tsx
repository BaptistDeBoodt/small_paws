import AdminAddButton from '@components/admin/AdminAddButton';
import DogProfile from '@components/dogProfile/DogProfile';
import Loading from '@components/Loading';
import Message from '@components/Message';
import useUsers from '@hooks/Users/useUsers';
import useUser from '@hooks/Users/useUser'
import PageLayout from '@layout/PageLayout';
import { globalStyles } from '@styles/styles';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';

const Volunteers = () => {
  const { volunteers, loading, error } = useUsers();
  const router = useRouter();
  const { profile } = useUser();

  if (loading || !profile) return null;

  const isAdmin = profile.role === 1;

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
    <View style={{ flex: 1 }}>
      <PageLayout>
        <Text style={globalStyles.pageTitle}>Vrijwilligers</Text>
        {error && <Text style={{ color: 'red' }}>⚠️ {error}</Text>}
        {Volunteers.length === 0 && (
          <Message message='Geen vrijwilligers gevonden'/>
        )}
        {volunteers.length > 0 && (
          <View style={globalStyles.section}>
            {volunteers.map((volunteer, index) => (
              <VolunteerProfile
                key={index}
                id={volunteer.id}
                first_name={volunteer.first_name}
                last_name={volunteer.last_name}
                phone={volunteer.phone}
                birthdate={volunteer.birthdate}
                email={volunteer.email}
                level={volunteer.level}
                role={volunteer.role}
              />
            ))}
          </View>
        )}
        <View style={globalStyles.m_space} />
      </PageLayout>

      {isAdmin && (
      <View style={globalStyles.buttonContainer}>
        <AdminAddButton
          onPress={() => router.push('/pages/DogAdd')}
        />
      </View>
      )}
    </View>
  );
}

export default Volunteers;
