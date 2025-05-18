import { StyleSheet } from 'react-native';
import { colors } from '@styles/colors';

export const profileStyles = StyleSheet.create({
    card : {
        width: '100%',
        backgroundColor: colors.orange_100,
        borderRadius: 11,
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.25)',
        padding: 20,
    },

    profileIconContainer : {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.orange_100,
        borderWidth: 5,
        borderColor: colors.orange_500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    profileIcon : {
        width: 60,
        height: 60,
    },

    name : {
        fontSize: 24,
        color: colors.orange_900,
        fontWeight: 'bold',
        fontFamily: 'Afacad',
    },

    nameContainer : {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },


    email : {
        fontSize: 16,
        color: colors.orange_500,
        fontWeight: 'normal',
        fontFamily: 'Afacad',
        marginBottom: 10,
    },

    top : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        marginBottom: 30,
    },

    switch : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
    },

    text : {
        fontSize: 16,
        color: colors.orange_900,
        fontWeight: 'normal',
        fontFamily: 'Afacad',
    }
})