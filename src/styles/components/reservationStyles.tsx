import { StyleSheet } from 'react-native';
import { colors } from '@styles/colors';

export const reservationStyles = StyleSheet.create({
    card : {
        width: '100%',
        backgroundColor: colors.orange_100,
        borderRadius: 11,
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.25)',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },

    count : {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.orange_900,
    },

    switch: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10
    },

    names: {
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: 'bold',
        color: colors.orange_900,
    },

    namesContianer: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 10
    }
})