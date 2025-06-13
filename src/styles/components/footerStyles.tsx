import { colors } from '@styles/colors';
import { StyleSheet } from 'react-native';

export const footerStyles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: colors.orange_100,
        paddingTop: 20,
        paddingBottom: 55,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: "center",
        zIndex: 10,
        shadowColor: colors.orange_900,
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },
    
    logo: {
        width: 30,
        height: 30,
    },

    shifts: {
        width: 40,
        height: 40,
    },

    reservations: {
        width: 35, 
        height: 35,
    }
})