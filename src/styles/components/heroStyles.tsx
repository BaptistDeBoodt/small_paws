import { StyleSheet } from 'react-native';
import { colors } from '@styles/colors';

export const heroStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: 500,
        backgroundColor: colors.orange_500,
        display: 'flex',
        alignItems: 'center',
        paddingTop: 15,
    },

    text: {
        color: colors.orange_500,
        fontSize: 35,
        fontFamily: 'Afacad',
        fontWeight: 'bold',
    },
})