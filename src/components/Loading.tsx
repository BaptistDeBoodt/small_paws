import { Image } from 'expo-image';
import { globalStyles } from '@styles/styles'

export default function Loading() {
  return (
      <Image
        source={require('@assets/images/icons/loading.svg')}
        style={globalStyles.loading}
      />
  )
}