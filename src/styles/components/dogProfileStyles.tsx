import { StyleSheet } from 'react-native';
import { colors } from '@styles/colors';

export const dogProfileStyles = StyleSheet.create({
    card: {
        width: 160,
        height: 350,
        backgroundColor: colors.orange_100,
        borderRadius: 11,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        marginBottom: 20,
        position: 'relative',
    },

    image: {
        width: '100%',
        height: '55%',
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
    },

    replace_image_container: {
        width: '100%',
        height: '55%',
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.orange_200
    },

    replace_image: {
        height: 70,
        width: 70,
    },

    info: {
        padding: 10,
    },

    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.orange_500,
        marginBottom: 5,
    },

    text: {
        fontSize: 13,
        color: colors.orange_900,
    },

    colorCode: {
        width: '100%',
        height: 20,
        position: 'absolute',
        bottom: 0,
        borderBottomRightRadius: 11,
        borderBottomLeftRadius: 11,
    },

    green: {
        backgroundColor: colors.green_600,
    },

    red: {
        backgroundColor: colors.red_600,
    },

    orange: {
        backgroundColor: colors.orange_500,
    },
})