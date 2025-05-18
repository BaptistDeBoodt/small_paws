import { dogProfileDetailStyles } from '@styles/styles';
import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';
import { DogProfileProps } from '@typefiles/DogProfileProps';

const getLevelColor = (level?: number): string => {
  if (level === 1) return 'Groen';
  if (level === 2) return 'Oranje';
  if (level === 3) return 'Rood';
  return '';
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year.slice(2)}`;
}

const getGenderLabel = (sex?: string): string => {
    if (sex === 'male') return 'Mannelijk';
    if (sex === 'female') return 'Vrouwelijk';
    return 'Onbekend';
}

const DogProfileDetail = ({ name, breed, birthdate, sex, level, reference, image }: DogProfileProps) => {
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
                <Text style={dogProfileDetailStyles.text}>{name}</Text>
            </View>
            <View style={dogProfileDetailStyles.flex}>
                <Text style={[dogProfileDetailStyles.text, dogProfileDetailStyles.subject]}>Ras:</Text>
                <Text style={dogProfileDetailStyles.text}>{breed}</Text>
            </View>
            <View style={dogProfileDetailStyles.flex}>
                <Text style={[dogProfileDetailStyles.text, dogProfileDetailStyles.subject]}>Geslacht:</Text>
                <Text style={dogProfileDetailStyles.text}>{getGenderLabel(sex)}</Text>
            </View>
            <View style={dogProfileDetailStyles.flex}>
                <Text style={[dogProfileDetailStyles.text, dogProfileDetailStyles.subject]}>Geboren:</Text>
                <Text style={dogProfileDetailStyles.text}>{formatDate(birthdate)}</Text>
            </View>
            <View style={dogProfileDetailStyles.flex}>
                <Text style={[dogProfileDetailStyles.text, dogProfileDetailStyles.subject]}>Niveau:</Text>
                <Text style={dogProfileDetailStyles.text}>{getLevelColor(level)}</Text>
            </View>
            <View style={dogProfileDetailStyles.flex}>
                <Text style={[dogProfileDetailStyles.text, dogProfileDetailStyles.subject]}>Referentie:</Text>
                <Text style={dogProfileDetailStyles.text}>{reference}</Text>
            </View>
        </View>
    </View>
    </>
  )
}

export default DogProfileDetail;