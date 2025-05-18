import { heroStyles } from '@styles/styles';
import { ImageBackground, Text } from 'react-native';

export default function Hero() {
  return (
    <>
    <ImageBackground
        style={heroStyles.container}
        source={require('@assets/images/hero.jpg')}
    >
        <Text style={heroStyles.text}>Welkom Harper</Text>
    </ImageBackground>
    </>
  )
}