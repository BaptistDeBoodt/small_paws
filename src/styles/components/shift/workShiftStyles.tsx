import { StyleSheet } from 'react-native';
import { colors } from '@styles/colors';

export const workShiftStyles = StyleSheet.create({
    cl900: {
      color: colors.orange_900,
    },

    cl100: {
      color: colors.orange_100,
    },

    bg500: {
        backgroundColor: colors.orange_500,
    },

    bg200: {
      backgroundColor: colors.orange_200,
    },

    switch: {
      transform: [{scaleX: -1 }, { scaleY: 1 }],
    },

    turn: {
      transform: [{ rotate: '270deg' }],
    },
})