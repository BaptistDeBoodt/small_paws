import Loading from '@components/Loading';
import AdminEditButton from '@components/admin/AdminEditButton';
import DogProfileDetail from '@components/dogProfile/DogProfileDetail';
import DogProfileFilter from '@components/dogProfile/filterSection/DogProfileFilter';
import useDog from '@hooks/Dogs/useDog';
import useShifts from '@hooks/Shifts/useShifts';
import useUser from '@hooks/Users/useUser';
import PageLayout from '@layout/PageLayout';
import { globalStyles } from '@styles/styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View } from 'react-native';

const DogDetail = () => {
  const { id } = useLocalSearchParams();
  const { dog, loading, error } = useDog(id as string);
  const { shifts } = useShifts();
  const { profile } = useUser();

  if (loading || !profile) return null;

  const isAdmin = profile.role === 1;

  const router = useRouter();

  const filteredShifts = shifts.filter(
    (shift) => String(shift.Dogs?.id) === id
  );

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
      <Text style={globalStyles.pageTitle}>{dog && dog.name ? dog.name : ''}</Text>
      <View style={globalStyles.section}>
      {dog && (
        <DogProfileDetail 
          id={dog.id}
          name={dog.name}
          breed={dog.breed}
          birthdate={dog.birthdate}
          sex={dog.sex}
          level={dog.level}
          reference={dog.reference}
          image={dog.image}
        />
      )}
      </View>
      <View style={globalStyles.section}>
      {dog && (  
        <DogProfileFilter 
          description={dog.description}
          shifts={filteredShifts}
        />
      )}
      </View>
      <View style={globalStyles.m_space} />
    </PageLayout>

    {isAdmin && (
      <View style={globalStyles.buttonContainer}>
        <AdminEditButton
          onPress={() => router.push({ pathname: '/pages/EditDog/[id]', params: { id } })}
        />
      </View>
    )}
  </View>
  );
}

export default DogDetail;