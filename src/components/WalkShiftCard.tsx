import { shiftCardStyles, walkShiftStyles } from '@styles/styles';
import { ShiftTypeProps } from '@typefiles/ShiftTypeProps';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const WalkShiftCard = ({ start_time, end_time, shift_date, dogName, id }: ShiftTypeProps & { dogName?: string }) => {
  const router = useRouter();

  const date = new Date(shift_date);

  const dayName = date.toLocaleDateString('nl-BE', { weekday: 'long' });

  const formattedDate = date.toLocaleDateString('nl-BE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formatTime = (timeStr?: string) => {
    if (!timeStr) return '';

    const [hours, minutes] = timeStr.split(':');
    return `${parseInt(hours)}u${minutes}`;
  };

  return (
    <TouchableOpacity onPress={() => router.push({ pathname: '/pages/ShiftDetail/[id]', params: { id } })} 
     style={[shiftCardStyles.card, walkShiftStyles.bg200]}>
        <View style={shiftCardStyles.switch}>
          <Text style={[shiftCardStyles.title, walkShiftStyles.cl900]}>
            {dayName.charAt(0).toUpperCase() + dayName.slice(1)}
          </Text>
          <Text style={[shiftCardStyles.time, walkShiftStyles.cl900]}>
            {`${formatTime(start_time)} - ${formatTime(end_time)}`}
          </Text>
        </View>
        <Text style={[shiftCardStyles.date, walkShiftStyles.cl900]}>{formattedDate}</Text>

        <View style={[shiftCardStyles.pill, walkShiftStyles.bg600]}>
          <Image
            source={require('@assets/images/icons/walk-pill.svg')}
            style={shiftCardStyles.pillImage}
          />
          <Text style={[shiftCardStyles.pillTitle, walkShiftStyles.cl100]}>Wandel</Text>
        </View>

        <View style={shiftCardStyles.tag}>
          <Image
            source={require('@assets/images/icons/dog-green.svg')}
            style={shiftCardStyles.tagImage}
          />
          <Text style={[shiftCardStyles.tagText, walkShiftStyles.cl900]}>{dogName}</Text>
        </View>
    </TouchableOpacity>
  );
};

export default WalkShiftCard;