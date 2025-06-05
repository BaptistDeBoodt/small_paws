import { StyleSheet } from 'react-native';
import { colors } from '@styles/colors';

export const shiftCardStyles = StyleSheet.create({
    container: {
      width: '100%',
      paddingLeft: 25,
      paddingRight: 25,
      paddingTop: 15,
      paddingBottom: 25,
    },

    card: {
      width: '100%',
      backgroundColor: 'grey',
      borderRadius: 11,
      padding: 15,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      marginBottom: 20,
    },

    title: {
      color: 'lightgrey',
      fontSize: 20,
      fontFamily: 'Afacad',
      fontWeight: 'bold',
    },

    date: {
      color: 'lightgrey',
      fontSize: 20,
      fontFamily: 'Afacad',
      fontWeight: 'bold',
      marginBottom: 15,
    },

    pill: {
      backgroundColor: 'black',
      width: 100,
      borderRadius: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      paddingTop: 7,
      paddingBottom: 7,
      marginBottom: 15,
    },

    pillImage: {
      width: 15,
      height: 15,
      transform: [{ scaleX: -1 }],
      marginRight: 5,
    },

    pillTitle: {
      color: "lightgrey",
      fontSize: 13,
      fontFamily: 'Afacad',
    },

    tag: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },

    tagImage: {
      width: 30,
      height: 30,
      marginRight: 10,
    },

    tagText: {
      color: 'black',
      fontSize: 18,
      fontFamily: 'Afacad',
      fontWeight: 'regular',
    },

    time: {
      color: 'lightgrey',
      fontSize: 20,
      fontFamily: 'Afacad',
      fontWeight: 'regular',
      textAlign: 'right',
    },

    switch: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    }
})