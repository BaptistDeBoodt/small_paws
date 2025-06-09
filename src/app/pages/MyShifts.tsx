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
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const { claimedShifts, loading } = useClaimedShifts();

  if (loading) {
    return (
      <PageLayout>
        <View style={globalStyles.loadingContainer}>
          <Loading />
        </View>
      </PageLayout>
    );
  }

  // Groepeer shifts per datum
  const shiftsByDate: { [date: string]: typeof claimedShifts } = {};
  selectedDates.forEach((date) => {
    shiftsByDate[date] = claimedShifts.filter(
      (item) => item.Shifts.shift_date === date
    );
  });

  return (
    <View style={{ flex: 1 }}>
      <PageLayout>
        <Text style={globalStyles.pageTitle}>Mijn Shifts</Text>

        <View style={globalStyles.section}>
          <Calendar selectedDates={selectedDates} onDateChange={setSelectedDates} />
        </View>

        {selectedDates.length === 0 ? (
          <Message message="Selecteer een datum om je shifts te bekijken." />
        ) : (
          selectedDates.map((date) => {
            const dayShifts = shiftsByDate[date] || [];
            const walkShifts = dayShifts.filter((item) => item.Shifts.type === 'walk');
            const workShifts = dayShifts.filter((item) => item.Shifts.type === 'work');

            const hasNoShifts = walkShifts.length === 0 && workShifts.length === 0;

            return (
              <View key={date} style={globalStyles.section}>
                <Text style={globalStyles.sm_title}>
                  {new Date(date).toLocaleDateString('nl-BE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </Text>

                {hasNoShifts ? (
                  <Message message="Geen shifts op deze dag." />
                ) : (
                  <>
                    {/* Wandelingen */}
                    {walkShifts.map((item, index) => {
                      const shift = item.Shifts;
                      return (
                        <WalkShiftCard
                          key={`walk-${shift.id}-${index}`}
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
                    })}

                    {/* Taken */}
                    {workShifts.map((item, index) => {
                      const shift = item.Shifts;
                      return (
                        <WorkShiftCard
                          key={`work-${shift.id}-${index}`}
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
                  </>
                )}
              </View>
            );
          })
        )}

        <View style={globalStyles.m_space} />
      </PageLayout>
    </View>
  );
}
