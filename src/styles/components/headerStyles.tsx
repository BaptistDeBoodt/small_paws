import { StyleSheet } from 'react-native';
import { colors } from '@styles/colors';

export const headerStyles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: colors.orange_500,
        paddingTop: 40,
        paddingBottom: 25,
        paddingLeft: 25,
        paddingRight: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10,
    },
    
    logo: {
        width: 50,
        height: 50,
    }
})