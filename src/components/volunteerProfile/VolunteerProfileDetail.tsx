import { dogProfileDetailStyles } from '@styles/styles';
import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';
import UserProfile from '@typefiles/UserProfile';

const VolunteerProfileDetail = ({ first_name, last_name, birthdate, image }: UserProfile) => {
  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year.slice(2)}`;
  }  

  return (
    <>
    <View style={dogProfileDetailStyles.card}>
        {image ? (
            <Image
            source={{ uri: image }}
            style={dogProfileDetailStyles.image}
            />
        ) : (
            <View style={dogProfileDetailStyles.replace_image_container}>
            <Image
                source={require('@assets/images/icons/profileIcon.svg')}
                style={dogProfileDetailStyles.replace_image}
            />
            </View>
        )}
        <View style={dogProfileDetailStyles.info}>
            <View style={dogProfileDetailStyles.flex}>
                <Text style={[dogProfileDetailStyles.text, dogProfileDetailStyles.subject]}>Naam:</Text>
                <Text style={dogProfileDetailStyles.text}>{first_name} {last_name}</Text>
            </View>
            {birthdate && (
              <View style={dogProfileDetailStyles.flex}>
                <Text style={[dogProfileDetailStyles.text, dogProfileDetailStyles.subject]}>Geboren:</Text>
                <Text style={dogProfileDetailStyles.text}>{formatDate(birthdate)}</Text>
              </View>
            )}
        </View>
    </View>
    </>
  )
}

export default VolunteerProfileDetail;