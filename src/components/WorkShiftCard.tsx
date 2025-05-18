import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { shiftCardStyles, workShiftStyles } from '@styles/styles';
import { ShiftTypeProps } from '@typefiles/ShiftTypeProps';
import { useRouter } from 'expo-router';

const WorkShiftCard = ({ start_time, end_time, shift_date, label, id }: ShiftTypeProps) => {

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
    <>      
    <TouchableOpacity onPress={() => router.push({ pathname: '/pages/ShiftDetail/[id]', params: { id } })}
    style={[shiftCardStyles.card, workShiftStyles.bg200]}
    >
        <View>
        <Text style={[shiftCardStyles.title, workShiftStyles.cl900]}>
            {dayName.charAt(0).toUpperCase() + dayName.slice(1)}
        </Text>
        <Text style={[shiftCardStyles.date, workShiftStyles.cl900]}>{formattedDate}</Text>
        <View style={[shiftCardStyles.pill, workShiftStyles.bg500]}>
            <Image
            source={require('@assets/images/icons/hammer.svg')}
            style={[shiftCardStyles.pillImage, workShiftStyles.turn]}
            />
            <Text style={[shiftCardStyles.pillTitle, workShiftStyles.cl100]}>Taak</Text>
        </View>
        <View style={shiftCardStyles.tag}>
            <Image
            source={require('@assets/images/icons/clean.svg')}
            style={[shiftCardStyles.tagImage, workShiftStyles.switch]}
            />
            <Text style={[shiftCardStyles.tagText, workShiftStyles.cl900]}>{label}</Text>
        </View> 
        </View>
        <View>
        <Text style={[shiftCardStyles.time, workShiftStyles.cl900]}>
            {`${formatTime(start_time)} - ${formatTime(end_time)}`}
        </Text>
        </View>  
    </TouchableOpacity>
    </>
    )
};

export default WorkShiftCard;