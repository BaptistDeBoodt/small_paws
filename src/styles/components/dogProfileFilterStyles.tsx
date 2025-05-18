import { StyleSheet } from 'react-native';
import { colors } from '@styles/colors';

export const dogProfileFilterStyles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },

    filter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    subject: {
        fontSize: 20,
        color: colors.orange_900,
        fontWeight: 'bold',
        paddingLeft: 10,
    },

    icon: {
        width: 20,
        height: 20,
    },

    details: {
        paddingTop: 20,
        width: '100%',
    },

    subtitle: {
        fontSize: 16,
        color: colors.orange_900,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },

    text: {
        position: 'absolute',
        width: '100%',
        color: colors.orange_900,
        paddingTop: 20,
    },

    br: {
        height: 30,
    }
})