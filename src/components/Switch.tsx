import React from 'react';
import { Switch as LightSwitch } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { switchStyles } from '@styles/styles';
import { colors } from '@styles/colors';

type Props = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const Switch = ({ value, onValueChange }: Props) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={switchStyles.container}>
        <LightSwitch
          trackColor={{ false: colors.gray_500, true: colors.orange_500 }}
          thumbColor={value ? colors.orange_200 : colors.gray_400}
          onValueChange={onValueChange}
          value={value}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Switch;
