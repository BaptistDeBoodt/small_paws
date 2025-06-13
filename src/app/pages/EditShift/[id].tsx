import Button from '@components/Button';
import Loading from '@components/Loading';
import useDogs from '@hooks/Dogs/useDogs';
import useShift from '@hooks/Shifts/useShift';
import useUpdateShift from '@hooks/Shifts/useUpdateShift';
import PageLayout from '@layout/PageLayout';
import DateTimePicker from '@react-native-community/datetimepicker';
import { editProfileStyles, globalStyles, colors } from '@styles/styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

const parseTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

const formatDate = (date: Date | null) =>
  date ? date.toISOString().split('T')[0] : null;

const formatTime = (date: Date | null) =>
  date ? date.toTimeString().split(':').slice(0, 2).join(':') : null;

const ShiftEdit = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { shift, loading } = useShift(id as string);
  const { dogs } = useDogs();
  const { updateShift } = useUpdateShift();

  const [shiftDate, setShiftDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [crew, setCrew] = useState('');
  const [label, setLabel] = useState('');
  const [selectedDogId, setSelectedDogId] = useState<string | null>(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Log voor shift en controleren van data
  useEffect(() => {

    if (shift) {
      setShiftDate(new Date(shift.shift_date));
      setStartTime(parseTime(shift.start_time));
      setEndTime(parseTime(shift.end_time));
      setCrew(shift.crew?.toString() ?? '');
      setLabel(shift.label ?? '');

      const dogId = shift.Dogs?.id;
      if (dogId !== null && dogId !== undefined) {
        setSelectedDogId(String(dogId));
      } else {
        setSelectedDogId(null);
      }
    }
  }, [shift]);

  // Extra logs voor dogs en selectie
  useEffect(() => {
  }, [dogs, selectedDogId]);

  const handleSave = async () => {
    if (startTime && endTime && endTime <= startTime) {
      Alert.alert('Fout', 'Eindtijd moet na starttijd komen.');
      return;
    }

    if (shift.type === 'walk' && !selectedDogId) {
      Alert.alert('Fout', 'Selecteer een hond voor deze wandeling.');
      return;
    }

    const updatedData = {
      crew: crew ? Number(crew) : 1,
      start_time: formatTime(startTime),
      end_time: formatTime(endTime),
      shift_date: formatDate(shiftDate),
      type: shift.type,
      label: shift.type === 'work' ? label : null,
      dog_id: shift.type === 'walk' && selectedDogId ? selectedDogId : null,
    };

    const success = await updateShift(id, updatedData);

    if (success) {
      router.push('/pages/Reservations');
    } else {
      Alert.alert('Fout', 'Shift kon niet worden bijgewerkt.');
    }
  };

  if (loading || !shift) {
    return (
      <PageLayout>
        <View style={globalStyles.loadingContainer}>
          <Loading />
        </View>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Text style={globalStyles.pageTitle}>Shift Aanpassen</Text>
      <View style={globalStyles.section}>
        <View style={editProfileStyles.card}>
          {/* Date Picker */}
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={editProfileStyles.input}
          >
            <Text>{shiftDate ? formatDate(shiftDate) : 'Selecteer datum'}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={shiftDate || new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDatePicker(Platform.OS === 'ios');
                if (date) setShiftDate(date);
              }}
            />
          )}

          {/* Start Time */}
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
              is24Hour
              display="default"
              onChange={(event, date) => {
                setShowStartPicker(Platform.OS === 'ios');
                if (date) setStartTime(date);
              }}
            />
          )}

          {/* End Time */}
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
              is24Hour
              display="default"
              onChange={(event, date) => {
                setShowEndPicker(Platform.OS === 'ios');
                if (date) setEndTime(date);
              }}
            />
          )}

          {/* Crew */}
          <TextInput
            style={editProfileStyles.input}
            placeholder="Aantal crewleden"
            placeholderTextColor={colors.orange_900}
            value={crew}
            onChangeText={text => {
              if (/^[1-9]?$/.test(text)) setCrew(text);
            }}
            keyboardType="numeric"
          />

          {/* Label alleen voor work */}
          {shift.type === 'work' && (
            <TextInput
              style={editProfileStyles.input}
              placeholder="Label"
              placeholderTextColor={colors.orange_900}
              value={label}
              onChangeText={setLabel}
            />
          )}

          {/* Hond selector alleen voor walk */}
          {shift.type === 'walk' && (
            <>
              <Text style={{ marginBottom: 10 }}>Kies een hond:</Text>
              {dogs.map((dog) => {
                const isSelected = String(dog.id) === selectedDogId;
                return (
                  <TouchableOpacity
                    key={dog.id}
                    onPress={() => {
                      setSelectedDogId(String(dog.id));
                    }}
                    style={{
                      padding: 10,
                      backgroundColor: isSelected ? '#F09D19' : '#F9E6C8',
                      borderRadius: 6,
                      marginBottom: 6,
                    }}
                  >
                    <Text style={{ color: isSelected ? '#F8F3EC' : '#392606' }}>
                      {dog.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </>
          )}

          <Button title="Opslaan" onPress={handleSave} />
        </View>
      </View>
      <View style={globalStyles.m_space} />
    </PageLayout>
  );
};

export default ShiftEdit;
