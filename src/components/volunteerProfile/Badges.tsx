import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { profileBadgeStyles } from '@styles/styles';
import useAdminUpdateUser from '@hooks/Users/useAdminUpdateUser';

const Badges = ({ id, level: initialLevel }) => {
  const [level, setLevel] = useState(initialLevel);
  const { updateUser } = useAdminUpdateUser();

  const badges = [
    null,
    require('@assets/images/icons/badge-green.svg'),
    require('@assets/images/icons/badge-orange.svg'),
    require('@assets/images/icons/badge-red.svg'),
  ];

  const updateLevelInDB = async (newLevel: number) => {
    try {
      await updateUser(id, { level: newLevel });
    } catch (error) {
      console.error('Fout bij updaten level:', error.message);
    }
  };

  const handleIncrement = async () => {
    const newLevel = Math.min(3, level + 1);
    setLevel(newLevel);
    await updateLevelInDB(newLevel);
  };

  const handleDecrement = async () => {
    const newLevel = Math.max(1, level - 1);
    setLevel(newLevel);
    await updateLevelInDB(newLevel);
  };

  if (!id) {
    console.warn('⚠️ Geen geldig ID meegegeven aan <Badges />');
    return null;
  }

  return (
    <View style={profileBadgeStyles.card}>
      <TouchableOpacity onPress={handleDecrement}>
        <Image
          style={profileBadgeStyles.button}
          source={require('@assets/images/icons/minus-orange.svg')}
        />
      </TouchableOpacity>
      <Image
        style={profileBadgeStyles.badge}
        source={badges[level] || badges[1]}
      />
      <TouchableOpacity onPress={handleIncrement}>
        <Image
          style={profileBadgeStyles.button}
          source={require('@assets/images/icons/plus-orange.svg')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Badges;
