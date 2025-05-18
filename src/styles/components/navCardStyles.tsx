import { StyleSheet } from 'react-native';
import { colors } from '@styles/colors';

export const navCardStyles = StyleSheet.create({
    card: {
        width: 160,
        height: 160,
        backgroundColor: colors.orange_500,
        borderRadius: 11,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        marginBottom: 20,
    },

    image: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },

    title: {
        color: colors.orange_100,
        fontSize: 20,
        fontFamily: 'Afacad',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})