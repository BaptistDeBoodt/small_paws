import Loading from '@components/Loading';
import ReservationInfo from '@components/ReservationInfo';
import ShiftDetailComp from '@components/ShiftDetailComp';
import useShift from '@hooks/Shifts/useShift';
import useUser from '@hooks/Users/useUser';
import PageLayout from '@layout/PageLayout';
import { globalStyles } from '@styles/styles';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import AdminEditButton from '@components/admin/AdminEditButton';
import { useRouter } from 'expo-router';

const ShiftDetail = () => {
  const { id } = useLocalSearchParams();
  const { shift, loading, error } = useShift(id as string);
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
        <View style={globalStyles.section}>
        {shift && (
          <ShiftDetailComp
              type={shift.type}
              startTime={shift.start_time}
              endTime={shift.end_time}
              shiftDate={shift.shift_date}
              label={shift.label}
              dogName={shift.Dogs?.name ?? 'Onbekende hond'}
          />
        )}
        </View>

        <View style={globalStyles.section}>
        {shift && (
          <ReservationInfo
            shiftId={typeof id === 'string' ? id : id?.[0] ?? ''}
            crew={shift.crew ?? 0}
            request={shift.request ?? 0}
          />
        )}
        </View>
      </PageLayout>

      {isAdmin && (
      <View style={globalStyles.buttonContainer}>
        <AdminEditButton
          onPress={() => router.push({ pathname: '/pages/EditShift/[id]', params: { id } })}
        />
      </View>
      )}
    </View>
  );
}

export default ShiftDetail;