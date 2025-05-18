import { StyleSheet } from 'react-native';
import { colors } from '@styles/colors';

export const calendarStyles = StyleSheet.create({
    container: {
        width: '100%',
    },

    calendar: {
        backgroundColor: colors.orange_100,
        borderRadius: 11,
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.25)',
        padding: 10,
    },
})