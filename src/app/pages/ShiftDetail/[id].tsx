import AdminDeleteButton from '@components/admin/AdminDeleteButton';
import AdminEditButton from '@components/admin/AdminEditButton';
import ReservationInfo from '@components/ReservationInfo';
import ShiftDetailComp from '@components/ShiftDetailComp';
import Loading from '@components/Loading'
import useShift from '@hooks/Shifts/useShift';
import useUser from '@hooks/Users/useUser';
import PageLayout from '@layout/PageLayout';
import { globalStyles } from '@styles/styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

const ShiftDetail = () => {
  const { id } = useLocalSearchParams();
  const { shift, loading } = useShift(id as string);
  const { profile } = useUser();
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

  const dogId = shift?.Dogs ? shift.Dogs.id : null;
  const dogName = shift?.Dogs ? shift.Dogs.name : 'Onbekende hond';

  const isAdmin = profile.role === 1;

  return (
    <View style={{ flex: 1 }}>
      <PageLayout>
        <View style={globalStyles.section}>
          {shift && (
            <ShiftDetailComp
              type={shift.type}
              start_time={shift.start_time}
              end_time={shift.end_time}
              shift_date={shift.shift_date}
              label={shift.label}
              Dogs={shift.Dogs?.id}
              dogName={dogName}
              dogId={dogId}
            />
          )}
        </View>

        <View style={globalStyles.section}>
          {shift && (
            <ReservationInfo
              shiftId={typeof id === 'string' ? id : id?.[0] ?? ''}
              crew={shift.crew ?? 0}
              end_time={shift.end_time}
              shift_date={shift.shift_date}
              request={shift.request ?? 0}
              dogLevel={shift.Dogs?.level ?? null}
              profile={profile}
            />
          )}
        </View>
      </PageLayout>

      {isAdmin && (
        <View style={globalStyles.buttonContainer}>
          <AdminDeleteButton shiftId={id as string} />
          <AdminEditButton
            onPress={() => router.push({ pathname: '/pages/EditShift/[id]', params: { id } })}
          />
        </View>
      )}
    </View>
  );
};

export default ShiftDetail;
