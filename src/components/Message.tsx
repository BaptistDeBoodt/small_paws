import { Text, View } from 'react-native';
import { messageStyles } from '@styles/styles'

type MessageProps = {
  message: string;
}

const Message = ({message}: MessageProps) => {
  return (
    <View style={messageStyles.container}>
      <Text style={messageStyles.message}>{message}</Text>
    </View>
  )
}

export default Message


