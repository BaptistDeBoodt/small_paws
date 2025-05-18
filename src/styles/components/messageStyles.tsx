import { StyleSheet } from 'react-native';
import { colors } from '@styles/colors';

export const messageStyles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    message: {
        color: colors.orange_900,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    }
})
