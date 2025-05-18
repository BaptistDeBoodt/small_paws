import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { footerStyles } from '@styles/styles';
import useUser from '@hooks/Users/useUser'

export default function Footer() {
  const router = useRouter();
  const { profile, loading } = useUser();

  if (loading || !profile) return null;

  const isAdmin = profile.role === 1;

  return (
    <>
      <View style={footerStyles.container}>
        <TouchableOpacity onPress={() => router.push('/pages/Dogs')}>
          <Image
            source={require('@assets/images/icons/dog-footer.svg')}
            style={footerStyles.logo}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/pages/Profile')}>
          <Image
            source={require('@assets/images/icons/profile-footer.svg')}
            style={footerStyles.logo}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/pages/Reservations')}>
          <Image
            source={require('@assets/images/icons/calender-footer.svg')}
            style={[footerStyles.logo, footerStyles.reservations]}
          />
        </TouchableOpacity>

        {isAdmin ? (  
        <TouchableOpacity onPress={() => router.push('/pages/Volunteers')}>
          <Image
            source={require('@assets/images/icons/volunteer.svg')}
            style={[footerStyles.logo]}
          />
        </TouchableOpacity>

        ) : (

        <TouchableOpacity onPress={() => router.push('/pages/MyShifts')}>
          <Image
            source={require('@assets/images/icons/bag-footer.svg')}
            style={[footerStyles.logo, footerStyles.shifts]}
          />
        </TouchableOpacity>
        )}
      </View>
    </>
  );
}
