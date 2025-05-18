import { StyleSheet } from 'react-native';
import { colors } from '@styles/colors';

export const badgeStyles = StyleSheet.create({
    card : {
        width: '100%',
        backgroundColor: colors.orange_100,
        borderRadius: 11,
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.25)',
        padding: 20,
        minHeight: 200,
    },

    badges : {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    badge : {
        width: 50,
        height: 50,
        marginRight: 10,
    },

    title : {
        fontSize: 20,
        color: colors.orange_900,
        fontWeight: 'bold',
        fontFamily: 'Afacad',
        marginBottom: 10,
    },

    hidden: {
        display: 'none',
    }
})