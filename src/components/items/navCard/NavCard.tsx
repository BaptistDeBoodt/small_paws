// pages/NavCard.tsx
import React from 'react';
import { NavCardItem } from '@components/components';

export default function NavCard() {
  const navItems = [
    {
      title: 'Honden',
      icon: require('@assets/images/icons/dog.svg'),
      route: '/pages/Dogs',
    },
    {
      title: 'Profiel',
      icon: require('@assets/images/icons/profile.svg'),
      route: '/pages/Profile',
    },
    {
      title: 'Mijn Shifts',
      icon: require('@assets/images/icons/bag.svg'),
      route: '/pages/MyShifts',
    },
    {
      title: 'Reserveringen',
      icon: require('@assets/images/icons/calender.svg'),
      route: '/pages/Reservations',
    },
  ];

  return (
    <>
      {navItems.map((item) => (
        <NavCardItem
          key={item.title}
          title={item.title}
          icon={item.icon}
          route={item.route}
        />
      ))}
    </>
  );
}
