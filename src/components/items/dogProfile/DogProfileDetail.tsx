import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { dogProfileDetailStyles } from '@styles/styles';

export default function DogProfileDetail() {
  return (
    <>
    <View style={dogProfileDetailStyles.card}>
        <Image
        source={require('@assets/images/dogs/ScoobyDoo.jpg')}
        style={dogProfileDetailStyles.image}
        />
        <View style={dogProfileDetailStyles.info}>
            <View style={dogProfileDetailStyles.flex}>
                <Text style={[dogProfileDetailStyles.text, dogProfileDetailStyles.subject]}>Naam:</Text>
                <Text style={dogProfileDetailStyles.text}>Scooby Doo</Text>
            </View>
            <View style={dogProfileDetailStyles.flex}>
                <Text style={[dogProfileDetailStyles.text, dogProfileDetailStyles.subject]}>Ras:</Text>
                <Text style={dogProfileDetailStyles.text}>Duitse Herder</Text>
            </View>
            <View style={dogProfileDetailStyles.flex}>
                <Text style={[dogProfileDetailStyles.text, dogProfileDetailStyles.subject]}>Geslacht:</Text>
                <Text style={dogProfileDetailStyles.text}>Mannelijk</Text>
            </View>
            <View style={dogProfileDetailStyles.flex}>
                <Text style={[dogProfileDetailStyles.text, dogProfileDetailStyles.subject]}>Geboren:</Text>
                <Text style={dogProfileDetailStyles.text}>01/01/24</Text>
            </View>
            <View style={dogProfileDetailStyles.flex}>
                <Text style={[dogProfileDetailStyles.text, dogProfileDetailStyles.subject]}>Kleur:</Text>
                <Text style={dogProfileDetailStyles.text}>Groen</Text>
            </View>
            <View style={dogProfileDetailStyles.flex}>
                <Text style={[dogProfileDetailStyles.text, dogProfileDetailStyles.subject]}>Referentie:</Text>
                <Text style={dogProfileDetailStyles.text}>045687910025</Text>
            </View>
        </View>
    </View>
    </>
  )
}