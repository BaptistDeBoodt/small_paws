import React, { useEffect, useState } from 'react';
import { Alert, AppState, AppStateStatus, View, TextInput, Text, Touchable, TouchableOpacity } from 'react-native';
import { supabase } from '@utils/supabase';
import Button from '@components/Button';
import { globalStyles, authStyles } from '@styles/styles';
import AuthLayout from '@layout/AuthLayout';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

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
          <TouchableOpacity
            onPress={handleLogin}
            style={authStyles.login_button}
          >
            <Text style={authStyles.text}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>  
    </AuthLayout>
  );
};

export default Auth;
