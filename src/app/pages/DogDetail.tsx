import { DogProfileDetail, DogProfileFilter } from '@components/components';
import PageLayout from '@layout/PageLayout';
import { Text, View } from 'react-native';
import { globalStyles } from '@styles/styles';

export default function DogDetail() {
  return (
    <>
    <PageLayout>
      <Text style={globalStyles.pageTitle}>Scooby Doo</Text>
      <View style={globalStyles.section}>
        <DogProfileDetail />
      </View>
      <View style={globalStyles.section}>
        <DogProfileFilter />
      </View>
      <View style={globalStyles.m_space} />
    </PageLayout>
    </>
  );
}