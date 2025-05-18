import Calendar from '@components/Calendar';
import Loading from '@components/Loading';
import Message from '@components/Message';
import WalkShiftCard from '@components/WalkShiftCard';
import WorkShiftCard from '@components/WorkShiftCard';
import useClaimedShifts from '@hooks/ClaimedShifts/useClaimedShifts';
import PageLayout from '@layout/PageLayout';
import { globalStyles } from '@styles/styles';
import { useState } from 'react';
import { Text, View } from 'react-native';

export default function MyShifts() {
  const [selectedDate, setSelectedDate] = useState('');
  const { claimedShifts, loading } = useClaimedShifts();

  // Filter claimed shifts for the selected date
  const filteredWalkShifts = claimedShifts.filter(
    (item) => item.Shifts.type === 'walk' && item.Shifts.shift_date === selectedDate
  );

  const filteredWorkShifts = claimedShifts.filter(
    (item) => item.Shifts.type === 'work' && item.Shifts.shift_date === selectedDate
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
      <Text style={globalStyles.pageTitle}>Mijn Shifts</Text>

      <View style={globalStyles.section}>
        <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
      </View>

      {/* Wandelingen */}
      <View style={globalStyles.section}>
        <Text style={globalStyles.sm_title}>Wandelingen</Text>
        {filteredWalkShifts.length === 0 && (
          <Message message="Geen wandelingen op deze dag." />
        )}
        {filteredWalkShifts.map((item, index) => {
          const shift = item.Shifts;
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
        })}
      </View>

      {/* Taken */}
      <View style={globalStyles.section}>
        <Text style={globalStyles.sm_title}>Taken</Text>
        {filteredWorkShifts.length === 0 && (
          <Message message="Geen taken op deze dag." />
        )}
        {filteredWorkShifts.map((item, index) => {
          const shift = item.Shifts;
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
        })}
      </View>

      <View style={globalStyles.m_space} />
    </PageLayout>
  );
}
