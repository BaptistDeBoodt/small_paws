import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { dogProfileStyles } from '@styles/styles';

export default function DogProfile() {
  const router = useRouter();

  return (
    <>
      <TouchableOpacity onPress={() => router.push('/pages/DogDetail')} style={dogProfileStyles.card}>
        <Image
          source={require('@assets/images/dogs/ScoobyDoo.jpg')}
          style={dogProfileStyles.image}
        />
        <View style={dogProfileStyles.info}>
          <Text style={dogProfileStyles.name}>Scooby Doo</Text>
          <Text style={dogProfileStyles.text}>Duitse Herder</Text>
          <Text style={dogProfileStyles.text}>1 jaar en 5 maand</Text>
          <Text style={dogProfileStyles.text}>Reu</Text>
        </View>
        <View style={[dogProfileStyles.colorCode, dogProfileStyles.green]} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/pages/Dogs')} style={dogProfileStyles.card}>
        <Image
          source={require('@assets/images/dogs/Tommy.jpg')}
          style={dogProfileStyles.image}
        />
        <View style={dogProfileStyles.info}>
          <Text style={dogProfileStyles.name}>Tommy</Text>
          <Text style={dogProfileStyles.text}>Tibetaanse Mastiff</Text>
          <Text style={dogProfileStyles.text}>10 jaar en 12 maand</Text>
          <Text style={dogProfileStyles.text}>Teef</Text>
        </View>
        <View style={[dogProfileStyles.colorCode, dogProfileStyles.orange]} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/pages/Dogs')} style={dogProfileStyles.card}>
        <Image
          source={require('@assets/images/dogs/Pluisje.jpg')}
          style={dogProfileStyles.image}
        />
        <View style={dogProfileStyles.info}>
          <Text style={dogProfileStyles.name}>Pluisje</Text>
          <Text style={dogProfileStyles.text}>Duitse Herder</Text>
          <Text style={dogProfileStyles.text}>1 jaar en 5 maand</Text>
          <Text style={dogProfileStyles.text}>Reu</Text>
        </View>
        <View style={[dogProfileStyles.colorCode, dogProfileStyles.green]} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/pages/Dogs')} style={dogProfileStyles.card}>
        <Image
          source={require('@assets/images/dogs/Bladee.jpg')}
          style={dogProfileStyles.image}
        />
        <View style={dogProfileStyles.info}>
          <Text style={dogProfileStyles.name}>Bladee</Text>
          <Text style={dogProfileStyles.text}>Duitse Herder</Text>
          <Text style={dogProfileStyles.text}>1 jaar en 5 maand</Text>
          <Text style={dogProfileStyles.text}>Reu</Text>
        </View>
        <View style={[dogProfileStyles.colorCode, dogProfileStyles.red]} />
      </TouchableOpacity>
    </>
  )
}