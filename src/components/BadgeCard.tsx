import { badgeStyles } from '@styles/styles';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import UserProfile from '@typefiles/UserProfile';

const BadgeCard = ({ level }: UserProfile) => {
  const badges = [
    require('@assets/images/icons/badge-green.svg'),
    require('@assets/images/icons/badge-orange.svg'),
    require('@assets/images/icons/badge-red.svg'),
  ];

  return (
    <View style={badgeStyles.card}>
      <Text style={badgeStyles.title}>Badges</Text>
      <View style={badgeStyles.badges}>
        {badges.slice(0, level).map((badge, index) => (
          <Image key={index} source={badge} style={badgeStyles.badge} />
        ))}
      </View>
    </View>
  );
};

export default BadgeCard;