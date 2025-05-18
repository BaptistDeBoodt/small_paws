// DogProfile.tsx
import { volunteerProfileStyles } from '@styles/styles';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import UserProfile from '@typefiles/UserProfile';

const VolunteerProfile = ({ id, first_name, last_name, email }: UserProfile) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push({ pathname: '/pages/VolunteerDetail/[id]', params: { id } })} style={volunteerProfileStyles.card}>
      <Image
        // source={require(`@assets/images/dogs/${name}.jpg`)} // eventueel later
        style={volunteerProfileStyles.image}
      />
      <View style={volunteerProfileStyles.info}>
        <Text style={volunteerProfileStyles.name}>`{first_name} {last_name}`</Text>
        <Text style={volunteerProfileStyles.text}>{email}</Text>
        <View>
            
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default VolunteerProfile;
