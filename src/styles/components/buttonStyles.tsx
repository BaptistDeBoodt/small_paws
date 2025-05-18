import { StyleSheet } from 'react-native';
import { colors } from '@styles/colors';

export const buttonStyles = StyleSheet.create({
    wrapper: {
        alignSelf: 'flex-start',
    },

    container: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        backgroundColor: colors.orange_400,
        borderRadius: 6,
    },

    text: {
        color: colors.orange_100,
        fontSize: 16,
        textAlign: 'center',
    },
});
