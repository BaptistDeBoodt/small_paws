import React, { useState } from 'react';
import { View } from 'react-native';
import { calendarStyles } from '@styles/styles';
import { colors } from '@styles/colors';
import { Calendar as SmallCalendar } from 'react-native-calendars';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <View style={calendarStyles.container}>
      <SmallCalendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: colors.orange_500,
            
          },
        }}
        theme = {{
          todayTextColor: colors.orange_500,
          arrowColor: colors.orange_500,
          calendarBackground: colors.orange_100,
          textSectionTitleColor: colors.orange_500,
          dayTextColor: colors.orange_900,
          monthTextColor: colors.orange_900,
          textMonthFontWeight: 'bold',
          textMonthFontSize: 20,
          textDayFontWeight: 'bold',
          textDayHeaderFontWeight: 'bold',
          arrowHeight: 40,
          arrowWidth: 40,

        }}
        style={calendarStyles.calendar}
      />
    </View>
  );
}
