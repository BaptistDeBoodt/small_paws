import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { dogProfileFilterStyles } from '@styles/styles';

interface FilterLogicProps {
  title: string;
  children: React.ReactNode;
}

export default function FilterLogic({ title, children }: FilterLogicProps) {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [contentHeight, setContentHeight] = useState(0);
  const AnimatedImage = Animated.createAnimatedComponent(ExpoImage);

  const toggleDetails = () => {
    if (expanded) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 250,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => setExpanded(false));
    } else {
      setExpanded(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 250,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };

  const heightAnim = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  const opacityAnim = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const rotateIcon = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '180deg'],
  });

  return (
    <View style={dogProfileFilterStyles.container}>
      <TouchableOpacity
        style={dogProfileFilterStyles.filter}
        onPress={toggleDetails}
        activeOpacity={0.7}
      >
        <AnimatedImage
          source={require('@assets/images/icons/triangle.svg')}
          style={[dogProfileFilterStyles.icon, { transform: [{ rotate: rotateIcon }] }]}
        />
        <Text style={dogProfileFilterStyles.subject}>{title}</Text>
      </TouchableOpacity>

      <Animated.View
        style={[
          dogProfileFilterStyles.details,
          {
            height: heightAnim,
            opacity: opacityAnim,
            overflow: 'hidden',
          },
        ]}
      >
        <View
          style={dogProfileFilterStyles.text}
          onLayout={e => setContentHeight(e.nativeEvent.layout.height)}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
}
