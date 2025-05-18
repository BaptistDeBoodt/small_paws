import { shiftCardStyles, walkShiftStyles, workShiftStyles } from '@styles/styles';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function ShiftCard() {
    const router = useRouter();

  return (
    <>
    <View style={[shiftCardStyles.card, walkShiftStyles.bg200]}>
        <View>
        <Text style={[shiftCardStyles.title, walkShiftStyles.cl900]}>Maandag</Text>
        <Text style={[shiftCardStyles.date, walkShiftStyles.cl900]}>5 mei 2025</Text>
        <View style={[shiftCardStyles.pill, walkShiftStyles.bg600]}>
            <Image
            source={require('@assets/images/icons/walk-pill.svg')}
            style={shiftCardStyles.pillImage}
            />
            <Text style={[shiftCardStyles.pillTitle, walkShiftStyles.cl100]}>Wandel</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/pages/DogDetail')} style={shiftCardStyles.tag}>
            <Image
            source={require('@assets/images/icons/dog-green.svg')}
            style={shiftCardStyles.tagImage}
            />
            <Text style={[shiftCardStyles.tagText, walkShiftStyles.cl900]}>Scooby Doo</Text>
        </TouchableOpacity> 
        </View>
        <View>
        <Text style={[shiftCardStyles.time, walkShiftStyles.cl900]}>09u30 - 10u30</Text>
        </View>  
    </View>

    <View style={[shiftCardStyles.card, workShiftStyles.bg200]}>
        <View>
        <Text style={[shiftCardStyles.title, workShiftStyles.cl900]}>Maandag</Text>
        <Text style={[shiftCardStyles.date, workShiftStyles.cl900]}>5 mei 2025</Text>
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
            <Text style={[shiftCardStyles.tagText, workShiftStyles.cl900]}>Katten Kennel</Text>
        </View> 
        </View>
        <View>
        <Text style={[shiftCardStyles.time, workShiftStyles.cl900]}>15u30 - 17u30</Text>
        </View>  
    </View>
    </>
  )
}