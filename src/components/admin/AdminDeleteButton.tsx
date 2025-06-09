import { Alert, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { adminStyles } from '@styles/styles';
import useDeleteShift from '@hooks/Shifts/useDeleteShift';

type AdminButtonProps = {
  shiftId: string;
};

const AdminDeleteButton = ({ shiftId }: AdminButtonProps) => {
  const { deleteShift } = useDeleteShift();

  const confirmDelete = () => {
    Alert.alert(
      'Verwijder shift',
      'Weet je zeker dat je deze shift wilt verwijderen?',
      [
        { text: 'Annuleer', style: 'cancel' },
        {
          text: 'Verwijder',
          style: 'destructive',
          onPress: () => deleteShift(shiftId),
        },
      ]
    );
  };

  return (
    <TouchableOpacity style={adminStyles.container} onPress={confirmDelete}>
      <Image
        source={require('@assets/images/icons/delete.svg')}
        style={[adminStyles.icon, adminStyles.smallerIcon]}
      />
    </TouchableOpacity>
  );
};

export default AdminDeleteButton;
