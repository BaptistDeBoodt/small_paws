import AdminAddButton from '@components/admin/AdminAddButton';
import Calendar from '@components/Calendar';
import Loading from '@components/Loading';
import Message from '@components/Message';
import WalkShiftCard from '@components/WalkShiftCard';
import WorkShiftCard from '@components/WorkShiftCard';
import useShifts from '@hooks/Shifts/useShifts';
import useUser from '@hooks/Users/useUser';
import PageLayout from '@layout/PageLayout';
import { globalStyles } from '@styles/styles';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

export default function Reservations() {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const { shifts: reservations, loading } = useShifts();
  const router = useRouter();
  const { profile } = useUser();

  if (loading || !profile) return null;

  const isAdmin = profile.role === 1;

  const filteredWalkShifts = reservations.filter(
    (res) => res.type === 'walk' && selectedDates.includes(res.shift_date)
  );

  const filteredWorkShifts = reservations.filter(
    (res) => res.type === 'work' && selectedDates.includes(res.shift_date)
  );

  return (
    <View style={{ flex: 1 }}>
      <PageLayout>
        <Text style={globalStyles.pageTitle}>Openstaande reserveringen</Text>

        <View style={globalStyles.section}>
          <Calendar selectedDates={selectedDates} onDateChange={setSelectedDates} />
        </View>

        <View style={globalStyles.section}>
          <Text style={globalStyles.sm_title}>Wandelingen</Text>
          {filteredWalkShifts.length === 0 ? (
            <Message message="Geen Wandelingen" />
          ) : (
            filteredWalkShifts.map((reservation, index) => (
              <WalkShiftCard
                key={index}
                id={reservation.id}
                type={reservation.type}
                start_time={reservation.start_time}
                end_time={reservation.end_time}
                shift_date={reservation.shift_date}
                crew={reservation.crew}
                label={reservation.label}
                dogName={reservation.Dogs?.name ?? 'Onbekende hond'}
              />
            ))
          )}
        </View>

        <View style={globalStyles.section}>
          <Text style={globalStyles.sm_title}>Taken</Text>
          {filteredWorkShifts.length === 0 ? (
            <Message message="Geen Taken" />
          ) : (
            filteredWorkShifts.map((reservation, index) => (
              <WorkShiftCard
                key={index}
                id={reservation.id}
                type={reservation.type}
                start_time={reservation.start_time}
                end_time={reservation.end_time}
                shift_date={reservation.shift_date}
                crew={reservation.crew}
                label={reservation.label}
              />
            ))
          )}
        </View>

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
