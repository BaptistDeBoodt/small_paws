import { View } from 'react-native';
import { calendarStyles } from '@styles/styles';
import { colors } from '@styles/colors';
import { Calendar as SmallCalendar } from 'react-native-calendars';
import { useState } from 'react';

type CalendarProps = {
  selectedDates: string[];
  onDateChange: (dates: string[]) => void;
};

const Calendar = ({ selectedDates, onDateChange }: CalendarProps) => {
  const [rangeStart, setRangeStart] = useState<string | null>(null);

  // Datum selectie via tikken
  const handleDayPress = (day: { dateString: string }) => {
    const selectedDate = day.dateString;

    if (rangeStart) {
      // Bereik selecteren vanaf langdruk tot huidige klik
      const range = getDatesBetween(rangeStart, selectedDate);
      onDateChange(range);
      setRangeStart(null);
    } else {
      // Enkelvoudige selectie
      onDateChange([selectedDate]);
    }
  };

  // Lang indrukken start een bereik
  const handleDayLongPress = (day: { dateString: string }) => {
    const selectedDate = day.dateString;
    setRangeStart(selectedDate);
    onDateChange([selectedDate]);
  };

  // Markeer geselecteerde datums
  const markedDates =
    selectedDates?.reduce((acc, date) => {
      acc[date] = {
        selected: true,
        selectedColor: colors.orange_500,
      };
      return acc;
    }, {} as Record<string, any>) || {};

  return (
    <View style={calendarStyles.container}>
      <SmallCalendar
        onDayPress={handleDayPress}
        onDayLongPress={handleDayLongPress}
        markedDates={markedDates}
        theme={{
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
};

export default Calendar;

// 🔧 Helper: maak een lijst met datums tussen start en eind
function getDatesBetween(start: string, end: string): string[] {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const result: string[] = [];

  const direction = startDate <= endDate ? 1 : -1;
  const current = new Date(startDate);

  while (
    (direction === 1 && current <= endDate) ||
    (direction === -1 && current >= endDate)
  ) {
    result.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + direction);
  }

  return result;
}
