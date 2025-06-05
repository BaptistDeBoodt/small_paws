import AdminAddButton from '@components/admin/AdminAddButton';
import VolunteerProfile from '@components/volunteerProfile/VolunteerProfile';
import Loading from '@components/Loading';
import Message from '@components/Message';
import useUsers from '@hooks/Users/useUsers';
import useUser from '@hooks/Users/useUser'
import PageLayout from '@layout/PageLayout';
import { globalStyles } from '@styles/styles';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';

const Volunteers = () => {
  const { profile, loading, error } = useUser();
  const isAdmin = profile?.role === 1;
  const { volunteers } = useUsers(isAdmin);
    
  const router = useRouter();

  if (loading || !profile) {
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
        {volunteers.filter((v) => v.role === 0).length === 0 ? (
        <Message message="Geen vrijwilligers gevonden" />
      ) : (
        <View style={globalStyles.section}>
          {volunteers
            .filter((volunteer) => volunteer.role === 0)
            .map((volunteer, index) => (
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
                image={volunteer.image}
              />
            ))}
        </View>
      )}
        <View style={globalStyles.m_space} />
      </PageLayout>

      {isAdmin && (
      <View style={globalStyles.buttonContainer}>
        <AdminAddButton
          onPress={() => router.push('/pages/VolunteerAdd')}
        />
      </View>
      )}
    </View>
  );
}

export default Volunteers;
