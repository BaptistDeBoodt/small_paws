import React, {useState} from 'react';
import {Switch as LightSwitch} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { switchStyles } from '@styles/styles';
import { colors } from '@styles/colors';

export default function Switch() {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={switchStyles.container}>
        <LightSwitch
          trackColor={{false: colors.gray_500, true: colors.orange_500}}
          thumbColor={isEnabled ? colors.orange_200 : colors.gray_400}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};