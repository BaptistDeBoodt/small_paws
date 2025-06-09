import { ScrollView } from 'react-native';
import { globalStyles } from '@styles/styles';
import { ReactNode } from 'react';
import Footer from '@components/Footer';

type AuthLayoutProps = {
    children: ReactNode
}

const HomeLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
    <ScrollView style={globalStyles.container}>
        {children}
    </ScrollView>
    <Footer />
    </>
  );
}

export default HomeLayout