import { StyleSheet } from 'react-native';
import { colors } from '@styles/colors';

export const dogProfileDetailStyles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: colors.orange_100,
        borderRadius: 11,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        marginBottom: 20,
        position: 'relative',
    },

    info: {
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
    },

    text: {
        fontSize: 20,
        color: colors.orange_900,
        maxWidth: 150,
    },

    subject: {
        width: 120,
    },

    flex: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
    },

    image: {
        width: '100%',
        height: 300,
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
    },

    replace_image_container: {
        width: '100%',
        height: 300,
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.orange_200
    },

    replace_image: {
        height: 100,
        width: 100,
    },
})