import { StyleSheet } from 'react-native';
import { colors } from '@styles/colors';

export const headerStyles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: colors.orange_100,
        paddingTop: 30,
        paddingBottom: 5,
        paddingLeft: 25,
        paddingRight: 25,
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
        width: 50,
        height: 50,
    }
})