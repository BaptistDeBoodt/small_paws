import { buttonStyles } from '@styles/styles';
import { Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
  title: string;
  onPress?: () => void;
};

const Button = ({ title, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[buttonStyles.wrapper, buttonStyles.container]}
      onPress={onPress}
    >
      <Text style={buttonStyles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
