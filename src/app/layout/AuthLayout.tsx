import { ScrollView } from 'react-native';
import { authStyles, globalStyles } from '@styles/styles';
import { ReactNode } from 'react';

type AuthLayoutProps = {
    children: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
    <ScrollView style={authStyles.overlap}>
        {children}
    </ScrollView>
    </>
  );
}

export default AuthLayout