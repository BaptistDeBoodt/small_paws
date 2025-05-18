import { colors } from '@styles/colors';
import { StyleSheet } from 'react-native';

export const adminStyles = StyleSheet.create({
    container : {
        backgroundColor: colors.orange_500,
        borderRadius: 50,
        height: 70,
        width: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon: {
        width: 50,
        height: 50,
    },

    smallerIcon: {
        width: 40,
        height: 40,
    },
})