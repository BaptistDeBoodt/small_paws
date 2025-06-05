import { StyleSheet } from 'react-native';
import { colors } from '@styles/colors';

export const createShiftStyles = StyleSheet.create({
    topShiftButtons: {
        borderRadius: 8,
        padding: 10
    },

    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginTop: 30,
    }
})