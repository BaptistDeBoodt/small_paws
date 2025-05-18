import React, { useEffect, useState } from 'react';
import { Alert, AppState, AppStateStatus, View, TextInput, Text } from 'react-native';
import { supabase } from '@utils/supabase';
import Button from '@components/Button';
import { globalStyles, authStyles } from '@styles/styles';
import AuthLayout from '@layout/AuthLayout';
import { useRouter } from 'expo-router';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [appState, setAppState] = useState(AppState.currentState);

  const router = useRouter();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );
    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    setAppState(nextAppState);
  };

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      await supabase.auth.getSession();

      router.push('/pages/Home');

    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Login failed', error.message);
      } else {
        Alert.alert('Login failed', 'An unknown error occurred');
      }
    }
  };

  return (
    <AuthLayout>
      <View style={globalStyles.section}>
        <View style={authStyles.card}>
          <Text style={authStyles.title}>Login</Text>
          <TextInput
            style={authStyles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={authStyles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Log In" onPress={handleLogin} />
        </View>
      </View>
    </AuthLayout> 
  );
};

export default Auth;
