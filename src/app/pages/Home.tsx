import Loading from '@components/Loading';
import { noShiftMessages, hasShiftMessages } from '@components/HomeMessage';
import WalkShiftCard from '@components/WalkShiftCard';
import WorkShiftCard from '@components/WorkShiftCard';
import Hero from '@components/Hero';
import useClaimedShifts from '@hooks/ClaimedShifts/useClaimedShifts';
import PageLayout from '@layout/PageLayout';
import { globalStyles } from '@styles/styles';
import { useMemo } from 'react';
import { View } from 'react-native';
import HomeLayout from '@layout/HomeLayout';
import useUser from '@hooks/Users/useUser';
import { useRouter } from 'expo-router';
import AdminSettingButton from '@components/admin/AdminSettingsButton'

export default function Home() {
  const { claimedShifts, loading } = useClaimedShifts();
  const today = new Date().toISOString().split('T')[0];
  const { profile } = useUser();
  const router = useRouter();

  const todayShifts = claimedShifts.filter(
    (item) => item.Shifts.shift_date === today
  );

  // Kies juiste lijst op basis van of er shifts zijn
  const messageOfTheDay = useMemo(() => {
    const source = todayShifts.length > 0 ? hasShiftMessages : noShiftMessages;
    const index = Math.floor(Math.random() * source.length);
    return source[index];
  }, [todayShifts.length]);

  if (loading || !profile) {
    return (
      <PageLayout>
        <View style={globalStyles.loadingContainer}>
          <Loading />
        </View>
      </PageLayout>
    );
  }

  const isAdmin = profile.role === 1;

  return (
    <View style={{ flex: 1 }}>
    <HomeLayout>
      <Hero message={messageOfTheDay} />
      <View style={globalStyles.section}>
        {todayShifts.map((item, index) => {
          const shift = item.Shifts;
          if (shift.type === 'walk') {
            return (
              <WalkShiftCard
                key={index}
                id={shift.id}
                type={shift.type}
                start_time={shift.start_time}
                end_time={shift.end_time}
                shift_date={shift.shift_date}
                crew={shift.crew}
                dogName={shift.Dogs?.name ?? 'Onbekende hond'}
                dogHealth={shift.Dogs?.healthy}
              />
            );
          } else if (shift.type === 'work') {
            return (
              <WorkShiftCard
                key={index}
                id={shift.id}
                type={shift.type}
                start_time={shift.start_time}
                end_time={shift.end_time}
                shift_date={shift.shift_date}
                crew={shift.crew}
                label={shift.label}
              />
            );
          } else {
            return null;
          }
        })}
      </View>
      <View style={globalStyles.m_space} />
    </HomeLayout>

    {isAdmin && (
        <View style={globalStyles.buttonContainer} pointerEvents="box-none">
          <AdminSettingButton onPress={() => router.push('/pages/Settings')} />
        </View>
      )}
    </View>
  );
}
