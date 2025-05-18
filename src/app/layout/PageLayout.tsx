import { ScrollView } from 'react-native';
import { globalStyles } from '@styles/styles';
import Footer from '@components/Footer';
import { ReactNode } from 'react';

type PageLayoutProps = {
  children: ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
    <ScrollView style={globalStyles.container}>
      {children}
    </ScrollView>
    <Footer />
    </>
  );
}
