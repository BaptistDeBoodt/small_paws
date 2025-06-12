import { colors } from '@styles/colors';
import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
    overlap: {
        height: '100%',
        backgroundColor: colors.orange_100
    },

    container: {
        backgroundColor: colors.orange_500,
        height: "100%",
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    card : {
        width: '100%',
        backgroundColor: colors.orange_100,
        padding: 20,
        paddingTop: 100,
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderTopLeftRadius: 100,
    },

    input : {
        width: '100%',
        height: 50,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: colors.orange_100,
        borderBottomWidth: 2,
        borderColor: colors.orange_500,
        color: colors.orange_900,
    },

    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },

    logo_container: {
        backgroundColor: colors.orange_500,
        height: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    logo: {
        height: 150,
        width: 150
    },

    login_button: {
        width: '100%',
        backgroundColor: colors.orange_500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 11,
        marginTop: 20,
        padding: 15
    },

    text: {
        color: colors.orange_100,
        fontWeight: 'bold',
        fontSize: 20
    }
})