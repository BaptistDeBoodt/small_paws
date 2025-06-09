import { shiftCardStyles, walkShiftStyles } from '@styles/styles';
import { ShiftTypeProps } from '@typefiles/ShiftTypeProps';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const WalkShiftCard = ({ start_time, end_time, shift_date, dogName, id, dogHealth }: ShiftTypeProps & { dogName?: string }) => {
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
    <TouchableOpacity
      onPress={() => router.push({ pathname: '/pages/ShiftDetail/[id]', params: { id } })}
      style={[
        shiftCardStyles.card,
        dogHealth ? walkShiftStyles.bg200 : walkShiftStyles.bgdisabled
      ]}
      disabled={!dogHealth}
    >
      <View style={shiftCardStyles.switch}>
        <Text
          style={[
            shiftCardStyles.title,
            dogHealth ? walkShiftStyles.cl900 : walkShiftStyles.cldisable
          ]}
        >
          {dayName.charAt(0).toUpperCase() + dayName.slice(1)}
        </Text>
        <Text
          style={[
            shiftCardStyles.time,
            dogHealth ? walkShiftStyles.cl900 : walkShiftStyles.cldisable
          ]}
        >
          {`${formatTime(start_time)} - ${formatTime(end_time)}`}
        </Text>
      </View>

      <Text
        style={[
          shiftCardStyles.date,
          dogHealth ? walkShiftStyles.cl900 : walkShiftStyles.cldisable
        ]}
      >
        {formattedDate}
      </Text>

      <View
        style={[
          shiftCardStyles.pill,
          dogHealth ? walkShiftStyles.bg600 : walkShiftStyles.bgdisabled_500
        ]}
      >
        <Image
          source={require('@assets/images/icons/walk-pill.svg')}
          style={shiftCardStyles.pillImage}
        />
        <Text
          style={[
            shiftCardStyles.pillTitle,
            dogHealth ? walkShiftStyles.cl100 : walkShiftStyles.cldisable
          ]}
        >
          Wandel
        </Text>
      </View>

      <View style={shiftCardStyles.tag}>
        <Image
          source={
          dogHealth
            ? require('@assets/images/icons/dog-green.svg')
            : require('@assets/images/icons/dog-disabled.svg')
        }
        style={shiftCardStyles.tagImage}
        />
        <Text
          style={[
            shiftCardStyles.tagText,
            dogHealth ? walkShiftStyles.cl900 : walkShiftStyles.cldisable
          ]}
        >
          {dogName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default WalkShiftCard;