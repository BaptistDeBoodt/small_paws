import Button from '@components/Button';
import { profileStyles } from '@styles/styles';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import React from 'react';
import UserProfile from '@typefiles/UserProfile';

const ProfileCard = ({ first_name, last_name, phone, birthdate, email }: UserProfile) => {
  const router = useRouter();

  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year.slice(2)}`;
  }

  return (
    <View style={profileStyles.card}>
      <View style={profileStyles.top}>
        <View style={profileStyles.profileIconContainer}>
          <Image source={require('@assets/images/icons/profileIcon.svg')} style={profileStyles.profileIcon} />
        </View>
        <View>
          <View style={profileStyles.nameContainer}>
            <Text style={profileStyles.name}>{first_name}</Text>
            <Text style={profileStyles.name}>{last_name}</Text>
          </View>
          <Text style={profileStyles.email}>{email}</Text>
          <Button title="Aanpassen" onPress={() => router.push('/pages/EditProfile')} />
        </View>
      </View>
      <View>
        <View style={profileStyles.switch}>
          <Text style={profileStyles.text}>Geboortedatum:</Text>
          <Text style={profileStyles.text}>{formatDate(birthdate)}</Text>
        </View>
        <View style={profileStyles.switch}>
          <Text style={profileStyles.text}>Telefoonnummer:</Text>
          <Text style={profileStyles.text}>+32{phone}</Text>
        </View>
      </View>
    </View>
  );
}

export default ProfileCard;