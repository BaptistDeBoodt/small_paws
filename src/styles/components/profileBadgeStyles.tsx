import { StyleSheet } from 'react-native';
import { colors } from '@styles/colors';

export const profileBadgeStyles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: colors.orange_100,
        borderRadius: 11,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },

    badge: {
        width: 80,
        height: 80,
    },

    button: {
        width: 50,
        height: 50,
    }
})