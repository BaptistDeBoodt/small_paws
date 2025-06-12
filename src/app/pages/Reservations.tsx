import AdminAddButton from '@components/admin/AdminAddButton';
import Calendar from '@components/Calendar';
import Loading from '@components/Loading';
import Message from '@components/Message';
import WalkShiftCard from '@components/WalkShiftCard';
import WorkShiftCard from '@components/WorkShiftCard';
import useShifts from '@hooks/Shifts/useShifts';
import useUser from '@hooks/Users/useUser';
import useClaimedShifts from '@hooks/ClaimedShifts/useClaimedShifts';
import PageLayout from '@layout/PageLayout';
import { globalStyles } from '@styles/styles';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

export default function Reservations() {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const { shifts: reservations, loading } = useShifts();
  const { profile } = useUser();
  const { claimedShifts } = useClaimedShifts();
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

  const isAdmin = profile.role === 1;

  const dogPopularityMap: { [dogId: string]: number } = {};
  claimedShifts.forEach((claimed) => {
    const dogId = claimed.Shifts?.Dogs?.id;
    if (dogId) {
      dogPopularityMap[dogId] = (dogPopularityMap[dogId] || 0) + 1;
    }
  });

  const shiftsByDate: { [date: string]: typeof reservations } = {};
  selectedDates.forEach((date) => {
    shiftsByDate[date] = reservations.filter((res) => res.shift_date === date);
  });

  return (
    <View style={{ flex: 1 }}>
      <PageLayout>
        <Text style={globalStyles.pageTitle}>Openstaande reserveringen</Text>

        <View style={globalStyles.section}>
          <Calendar selectedDates={selectedDates} onDateChange={setSelectedDates} />
        </View>

        {selectedDates.length === 0 ? (
          <Message message="Selecteer een datum om reserveringen te bekijken." />
        ) : (
          selectedDates.map((date) => {
            const dayShifts = shiftsByDate[date] || [];

            const walkShifts = dayShifts
              .filter((res) => res.type === 'walk')
              .sort((a, b) => {
                const dogIdA = a.Dogs?.id ?? '';
                const dogIdB = b.Dogs?.id ?? '';
                const popA = dogPopularityMap[dogIdA] || 0;
                const popB = dogPopularityMap[dogIdB] || 0;
                return popA - popB;
              });

            const workShifts = dayShifts.filter((res) => res.type === 'work');
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
                    {walkShifts.map((reservation, index) => (
                      <WalkShiftCard
                        key={`walk-${reservation.id}-${index}`}
                        id={reservation.id}
                        type={reservation.type}
                        start_time={reservation.start_time}
                        end_time={reservation.end_time}
                        shift_date={reservation.shift_date}
                        crew={reservation.crew}
                        label={reservation.label}
                        dogName={reservation.Dogs?.name ?? 'Onbekende hond'}
                        dogHealth={reservation.Dogs?.healthy}
                      />
                    ))}

                    {workShifts.map((reservation, index) => (
                      <WorkShiftCard
                        key={`work-${reservation.id}-${index}`}
                        id={reservation.id}
                        type={reservation.type}
                        start_time={reservation.start_time}
                        end_time={reservation.end_time}
                        shift_date={reservation.shift_date}
                        crew={reservation.crew}
                        label={reservation.label}
                      />
                    ))}
                  </>
                )}
              </View>
            );
          })
        )}

        <View style={globalStyles.m_space} />
      </PageLayout>

      {isAdmin && (
        <View style={globalStyles.buttonContainer} pointerEvents="box-none">
          <AdminAddButton onPress={() => router.push('/pages/ReservationsAdd')} />
        </View>
      )}
    </View>
  );
}
