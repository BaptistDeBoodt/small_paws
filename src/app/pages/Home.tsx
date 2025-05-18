import Loading from '@components/Loading';
import Message from '@components/Message';
import NavCard from '@components/navCard/NavCard';
import WalkShiftCard from '@components/WalkShiftCard';
import WorkShiftCard from '@components/WorkShiftCard';
import useClaimedShifts from '@hooks/ClaimedShifts/useClaimedShifts';
import PageLayout from '@layout/PageLayout';
import { globalStyles } from '@styles/styles';
import { Text, View } from 'react-native';


export default function Home() {
  const { claimedShifts, loading } = useClaimedShifts();

  const today = new Date().toISOString().split('T')[0];

  const todayShifts = claimedShifts.filter(
    (item) => item.Shifts.shift_date === today
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
    <PageLayout>
      {/* <View style={globalStyles.section}>
        <NavCard />
      </View> */}

      <View style={globalStyles.section}>
        {todayShifts.length === 0 && (
          <Message message="Je hebt vandaag geen shifts opgeëist." />
        )}
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
    </PageLayout>
  );
}
