// DogProfile.tsx
import { dogProfileStyles } from '@styles/styles';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { DogProfileProps } from '@typefiles/DogProfileProps';

const DogProfile = ({ name, breed, birthdate, sex, level, id }: DogProfileProps) => {
  const router = useRouter();

  const getAge = (birthdate?: string): string | null => {
    if (!birthdate) return null;
    const birth = new Date(birthdate);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
      age--;
    }
    return age === 1 ? '1 jaar' : `${age} jaar`;
  }

  const getSexLabel = (sex?: string): string | null => {
    if (!sex) return null;
    if (sex.toLowerCase() === 'male') return 'Reu';
    if (sex.toLowerCase() === 'female') return 'Teef';
    return sex;
  }

  const getLevelLabel = (level?: number): string | null => {
    if (!level) return null;
    if (level === 1) return 'green';
    if (level === 2) return 'orange';
    if (level === 3) return 'red';
    return null;
  };

  return (
    <TouchableOpacity onPress={() => router.push({ pathname: '/pages/DogDetail/[id]', params: { id } })} style={dogProfileStyles.card}>
      <Image
        // source={require(`@assets/images/dogs/${name}.jpg`)} // eventueel later
        style={dogProfileStyles.image}
      />
      <View style={dogProfileStyles.info}>
        <Text style={dogProfileStyles.name}>{name}</Text>
        <Text style={dogProfileStyles.text}>{breed}</Text>
        <Text style={dogProfileStyles.text}>{getAge(birthdate)}</Text>
        <Text style={dogProfileStyles.text}>{getSexLabel(sex)}</Text>
      </View>
      {getLevelLabel(level) &&
        typeof dogProfileStyles[getLevelLabel(level) as keyof typeof dogProfileStyles] === 'object' && (
          <View style={[
            dogProfileStyles.colorCode,
            (dogProfileStyles[getLevelLabel(level) as keyof typeof dogProfileStyles] as object)
          ]} />
      )}
    </TouchableOpacity>
  );
}

export default DogProfile;
