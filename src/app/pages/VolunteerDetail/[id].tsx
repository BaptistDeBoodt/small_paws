import Loading from '@components/Loading';
import VolunteerProfileDetail from '@components/volunteerProfile/VolunteerProfileDetail';
import Badges from '@components/volunteerProfile/Badges'
import useVolunteer from '@hooks/Users/useVolunteer';
import PageLayout from '@layout/PageLayout';
import { globalStyles } from '@styles/styles';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

const VolunteerDetail = () => {
  const { id } = useLocalSearchParams();
  const { volunteer, loading, error } = useVolunteer(id as string);

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
      <Text style={globalStyles.pageTitle}>{volunteer && volunteer.first_name ? volunteer.first_name : ''}</Text>
      <View style={globalStyles.section}>
      {volunteer && (
        <VolunteerProfileDetail 
          id={volunteer.id}
          first_name={volunteer.first_name}
          last_name={volunteer.last_name}
          birthdate={volunteer.birthdate}
          image={volunteer.image}
        />
      )}
      </View>
      <View style={globalStyles.section}>
      {volunteer && (
        <Badges
          id={id}
          level={volunteer.level}
        />
      )}
      </View>
      <View style={globalStyles.m_space} />
    </PageLayout>
  );
}

export default VolunteerDetail;