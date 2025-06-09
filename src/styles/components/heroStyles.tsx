import { StyleSheet } from 'react-native';
import { colors } from '@styles/colors';

export const heroStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: 400,
        backgroundColor: colors.orange_500,
        padding: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        color: colors.orange_100,
        fontSize: 35,
        fontFamily: 'Afacad',
        fontWeight: 'bold',
        textAlign: 'center'
    },
})