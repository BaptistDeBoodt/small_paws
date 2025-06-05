import { shiftCardStyles, walkShiftStyles, workShiftStyles } from '@styles/styles';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ShiftTypeProps } from '@typefiles/ShiftTypeProps';
import React, { useEffect } from 'react';


const ShiftDetailComp = ({ start_time, end_time, shift_date, dogName, dogId, id, type, label }: ShiftTypeProps) => {
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


  if (type === 'work') {
    return (
      <View style={[shiftCardStyles.card, workShiftStyles.bg200]}>
        <View style={shiftCardStyles.switch}>
          <Text style={[shiftCardStyles.title, workShiftStyles.cl900]}>
            {dayName.charAt(0).toUpperCase() + dayName.slice(1)}
          </Text>
          <Text style={[shiftCardStyles.time, workShiftStyles.cl900]}>
            {`${formatTime(start_time)} - ${formatTime(end_time)}`}
          </Text>
        </View>
          <Text style={[shiftCardStyles.date, workShiftStyles.cl900]}>{formattedDate}</Text>

          <View style={[shiftCardStyles.pill, workShiftStyles.bg500]}>
            <Image
              source={require('@assets/images/icons/hammer.svg')}
              style={shiftCardStyles.pillImage}
            />
            <Text style={[shiftCardStyles.pillTitle, workShiftStyles.cl100]}>Werk</Text>
          </View>

          <View style={shiftCardStyles.tag}>
            <Image
              source={require('@assets/images/icons/clean.svg')}
              style={[shiftCardStyles.tagImage, workShiftStyles.switch]}
            />
            <Text style={[shiftCardStyles.tagText, workShiftStyles.cl900]}>{label}</Text>
          </View>
        </View>
    );
  }

  return (
    <View style={[shiftCardStyles.card, walkShiftStyles.bg200]}>
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

        <TouchableOpacity
          onPress={() => router.push({ pathname: '/pages/DogDetail/[id]', params: { id: dogId } })}
          style={shiftCardStyles.tag}
        >
          <Image
            source={require('@assets/images/icons/dog-green.svg')}
            style={shiftCardStyles.tagImage}
          />
          <Text style={[shiftCardStyles.tagText, walkShiftStyles.cl900]}>{dogName}</Text>
        </TouchableOpacity>
      </View>
  );
};

export default ShiftDetailComp;
