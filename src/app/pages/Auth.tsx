import React, { useEffect, useState } from 'react';
import {
  Alert,
  AppState,
  AppStateStatus,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import { supabase } from '@utils/supabase';
import { globalStyles, authStyles, colors } from '@styles/styles';
import AuthLayout from '@layout/AuthLayout';
import { Image } from 'expo-image';
import { router } from 'expo-router';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
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

      console.log("Login response:", { data, error });

      if (error || !data.session) {
        throw new Error(error?.message ?? 'No session returned');
      }

      if (data.session) {
        router.replace('/pages/Home'); // of een andere route zoals '/home'
      }

      // Do not navigate manually; session will trigger UI update via _layout
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
      <View style={authStyles.container}>
        <View style={authStyles.logo_container}>
          <Image
            style={authStyles.logo}
            source={require('@assets/images/icons/intro.svg')}
          />
        </View>
        <View style={authStyles.card}>
          <TextInput
            style={authStyles.input}
            placeholder="Email"
            placeholderTextColor={colors.orange_900}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={authStyles.input}
            placeholder="Password"
            placeholderTextColor={colors.orange_900}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity onPress={handleLogin} style={authStyles.login_button}>
            <Text style={authStyles.text}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
};

export default Auth;
