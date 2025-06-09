import { heroStyles } from '@styles/styles';
import { View, Text } from 'react-native';

type MessageProps = {
  message: string;
}

const Hero = ({message}: MessageProps) => {
  return (
    <>
    <View style={heroStyles.container}>
      <Text style={heroStyles.text}>{message}</Text>
    </View>
    </>
  )
}

export default Hero