import AdminAddButton from '@components/admin/AdminAddButton';
import DogProfile from '@components/dogProfile/DogProfile';
import Loading from '@components/Loading';
import Message from '@components/Message';
import useDogs from '@hooks/Dogs/useDogs';
import useUser from '@hooks/Users/useUser'
import PageLayout from '@layout/PageLayout';
import { globalStyles } from '@styles/styles';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';

const Dogs = () => {
  const { dogs, loading, error } = useDogs();
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
        <Text style={globalStyles.pageTitle}>Honden</Text>
        {error && <Text style={{ color: 'red' }}>⚠️ {error}</Text>}
        {dogs.length === 0 && (
          <Message message='Geen honden gevonden'/>
        )}
        {dogs.length > 0 && (
          <View style={globalStyles.section}>
            {dogs
              .filter((dog) => !dog.adopted)
              .map((dog, index) => (
                <DogProfile
                  key={index}
                  id={dog.id}
                  image={dog.image}
                  name={dog.name}
                  breed={dog.breed}
                  birthdate={dog.birthdate}
                  sex={dog.sex}
                  level={dog.level}
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

export default Dogs;
