import { useAutoGenerateWalkShifts } from '@hooks/Shifts/useAutoGenerateWalkShifts';
import PageLayout from '@layout/PageLayout';
import Button from '@components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Alert, Platform, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles, editProfileStyles } from '@styles/styles';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const formatTime = (date: Date | null) =>
  date ? date.toTimeString().split(':').slice(0, 2).join(':') : null;

const formatDate = (date: Date | null) =>
  date ? date.toISOString().split('T')[0] : null;

const AdminShiftGenerator = () => {
  const { generateShifts } = useAutoGenerateWalkShifts();
  const router = useRouter();

  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [shiftStartDate, setShiftStartDate] = useState<Date | null>(new Date());

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleClick = async () => {
    if (!startTime || !endTime || !shiftStartDate) {
      Alert.alert('Fout', 'Gelieve een starttijd, eindtijd en datum te kiezen.');
      return;
    }

    const startMinutes = startTime.getHours() * 60 + startTime.getMinutes();
    const endMinutes = endTime.getHours() * 60 + endTime.getMinutes();

    if (endMinutes <= startMinutes) {
      Alert.alert('Fout', 'De eindtijd moet later zijn dan de starttijd.');
      return;
    }

    Alert.alert(
      'Bevestigen',
      'Ben je zeker dat je shifts wil aanmaken? Bestaande wandelingen kunnen hierdoor overlappen.',
      [
        { text: 'Annuleren', style: 'cancel' },
        {
          text: 'Bevestigen',
          style: 'destructive',
          onPress: async () => {
            const success = await generateShifts(
              formatTime(startTime)!,
              formatTime(endTime)!,
              shiftStartDate
            );

            Alert.alert(
              success ? '✅ Shifts aangemaakt!' : '❌ Er is iets fout gegaan.'
            );

            if (success) router.push('/pages/Home'); // pas aan naar jouw home route
          },
        },
      ]
    );
  };

  return (
    <PageLayout>
      <Text style={globalStyles.pageTitle}>Wandelingen aanmaken</Text>
      <View style={globalStyles.section}>
        <View style={editProfileStyles.card}>
          <Text style={editProfileStyles.title}>Disclaimer</Text>
          <Text style={editProfileStyles.disclaimer}>
            Bij het klikken op de genereer-knop worden er voor een volledige week automatisch
            wandelshifts aangemaakt, startend vanaf de gekozen datum:
          </Text>

          {/* Startdatum */}
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={editProfileStyles.input}
          >
            <Text>
              {shiftStartDate ? formatDate(shiftStartDate) : 'Startdatum kiezen'}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={shiftStartDate || new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDatePicker(Platform.OS === 'ios');
                if (date) setShiftStartDate(date);
              }}
            />
          )}

          {/* Starttijd */}
          <TouchableOpacity
            onPress={() => setShowStartPicker(true)}
            style={editProfileStyles.input}
          >
            <Text>{startTime ? formatTime(startTime) : 'Starttijd kiezen'}</Text>
          </TouchableOpacity>
          {showStartPicker && (
            <DateTimePicker
              value={startTime || new Date()}
              mode="time"
              display="default"
              is24Hour
              onChange={(event, date) => {
                setShowStartPicker(Platform.OS === 'ios');
                if (date) setStartTime(date);
              }}
            />
          )}

          {/* Eindtijd */}
          <TouchableOpacity
            onPress={() => setShowEndPicker(true)}
            style={editProfileStyles.input}
          >
            <Text>{endTime ? formatTime(endTime) : 'Eindtijd kiezen'}</Text>
          </TouchableOpacity>
          {showEndPicker && (
            <DateTimePicker
              value={endTime || new Date()}
              mode="time"
              display="default"
              is24Hour
              onChange={(event, date) => {
                setShowEndPicker(Platform.OS === 'ios');
                if (date) setEndTime(date);
              }}
            />
          )}

          <Button title="Genereer shifts" onPress={handleClick} />
        </View>
      </View>
    </PageLayout>
  );
};

export default AdminShiftGenerator;
