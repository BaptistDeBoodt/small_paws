// DogProfile.tsx
import { volunteerProfileStyles } from '@styles/styles';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import UserProfile from '@typefiles/UserProfile';

const VolunteerProfile = ({ id, first_name, last_name, level, image }: UserProfile) => {
  const router = useRouter();

  const badges = [
    require('@assets/images/icons/badge-green.svg'),
    require('@assets/images/icons/badge-orange.svg'),
    require('@assets/images/icons/badge-red.svg'),
  ];

  console.log(image)

  return (
    <TouchableOpacity onPress={() => router.push({ pathname: '/pages/VolunteerDetail/[id]', params: { id } })} style={volunteerProfileStyles.card}>
      {image ? (
        <Image
          source={{ uri: image }}
          style={volunteerProfileStyles.image}
        />
      ) : (
        <View 
          style={volunteerProfileStyles.image_container_empty}
        >
          <Image
            source={require('@assets/images/icons/profileIcon.svg')}
            style={volunteerProfileStyles.image_empty}
          />
        </View>
      )}
      <View style={volunteerProfileStyles.info}>
        <Text style={volunteerProfileStyles.name}>{first_name} {last_name}</Text>
        <View style={volunteerProfileStyles.badges}>
          {badges.slice(0, level).map((badge, index) => (
            <Image key={index} source={badge} style={volunteerProfileStyles.badge} />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default VolunteerProfile;
