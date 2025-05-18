import { colors } from '@styles/colors';
import { StyleSheet } from 'react-native';

export const editProfileStyles = StyleSheet.create({
    card : {
        width: '100%',
        backgroundColor: colors.orange_100,
        borderRadius: 11,
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.25)',
        padding: 20,
        paddingTop: 30,
        paddingBottom: 30,
    },

    input : {
        width: '100%',
        height: 50,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: colors.orange_100,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.orange_900,
        color: colors.orange_900,
    },
})