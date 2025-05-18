// components/NavCardItem.tsx
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { navCardStyles } from '@styles/styles';

type NavCardItemProps = {
  title: string;
  icon: number;
  route: string;
};

export default function NavCardItem({ title, icon, route }: NavCardItemProps) {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(route as any)} style={navCardStyles.card}>
      <Image source={icon} style={navCardStyles.image} />
      <Text style={navCardStyles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
