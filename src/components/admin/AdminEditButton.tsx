import { adminStyles } from '@styles/styles';
import { TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

type AdminButtonProps = {
  onPress?: () => void;
};

const AdminEditButton = ({ onPress }: AdminButtonProps) => {

  return (
    <TouchableOpacity
      style={adminStyles.container}
      onPress={onPress}
    >
      <Image
        source={require('@assets/images/icons/edit.svg')}
        style={[adminStyles.icon, adminStyles.smallerIcon]}    
        />
    </TouchableOpacity>
  );
};

export default AdminEditButton;