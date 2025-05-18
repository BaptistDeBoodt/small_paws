import { headerStyles } from '@styles/styles';
import { TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function Header() {
  const router = useRouter();

  return (
    <>
    <View style={headerStyles.container}>
      <TouchableOpacity onPress={() => router.push('/pages/Home')} style={headerStyles.logo}>
        <Image
          source={require('@assets/images/icons/logo.svg')}
          style={headerStyles.logo}
        />
      </TouchableOpacity>
        <Image
          source={require('@assets/images/icons/hamburger.svg')}
          style={headerStyles.logo}
        />
    </View>
    </>
  )
}