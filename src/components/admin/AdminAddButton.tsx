import { adminStyles } from '@styles/styles';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

type AdminButtonProps = {
  onPress?: () => void;
};

const AdminAddButton = ({ onPress }: AdminButtonProps) => {

  return (
    <TouchableOpacity
      style={adminStyles.container}
      onPress={onPress}
    >
      <Image
        source={require('@assets/images/icons/plus.svg')}
        style={adminStyles.icon}    
        />
    </TouchableOpacity>
  );
};

export default AdminAddButton;