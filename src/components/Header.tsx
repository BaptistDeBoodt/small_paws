import { headerStyles } from '@styles/styles';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

export default function Header() {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack && router.canGoBack()) {
        router.back();
    } else {
        router.push('/pages/Home');
    }
  };

  return (
    <View style={headerStyles.container}>
      <TouchableOpacity onPress={handleBack}>
        <Image
          source={require('@assets/images/icons/prev.svg')}
          style={headerStyles.logo}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/pages/Home')}>
        <Image
          source={require('@assets/images/icons/logo-header.svg')}
          style={headerStyles.small_logo}
        />
      </TouchableOpacity>
    </View>
  );
}
