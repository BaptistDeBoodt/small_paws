import { colors } from '@styles/colors';
import { StyleSheet } from 'react-native';

export const editProfileStyles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: colors.orange_100,
        borderRadius: 11,
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.25)',
        padding: 20,
        paddingTop: 30,
        paddingBottom: 30,
    },

    input: {
        width: '100%',
        height: 50,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: colors.orange_100,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.orange_900,
        color: colors.orange_900,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },

    long_input: {
        height: 150,
        textAlignVertical: 'top'
    },

    image_container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 10,
    },

    image: {
        height: 50,
        width: 50,
        borderRadius: 50,
        borderColor: colors.orange_900,
        borderWidth: 2
    },

    radio_button_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16
    },

    radio_buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 24
    },

    button: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.orange_900,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },

    inside_button: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: colors.orange_500,
    }
})