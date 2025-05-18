import { ScrollView } from 'react-native';
import { globalStyles } from '@styles/styles';
import { ReactNode } from 'react';

type AuthLayoutProps = {
    children: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
    <ScrollView style={globalStyles.container}>
        {children}
    </ScrollView>
    </>
  );
}

export default AuthLayout