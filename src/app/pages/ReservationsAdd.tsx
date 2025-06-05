import Button from '@components/Button';
import Loading from '@components/Loading';
import useDogs from '@hooks/Dogs/useDogs';
import useAddShift from '@hooks/Shifts/useAddShift';
import PageLayout from '@layout/PageLayout';
import DateTimePicker from '@react-native-community/datetimepicker';
import { globalStyles } from '@styles/styles';
import { editProfileStyles } from '@styles/styles';
import { createShiftStyles } from '@styles/styles';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

const formatDate = (date: Date | null) =>
  date ? date.toISOString().split('T')[0] : null;

const formatTime = (date: Date | null) =>
  date ? date.toTimeString().split(':').slice(0, 2).join(':') : null;

const ReservationAdd = () => {
  const router = useRouter();
  const { addShift, loading } = useAddShift();
  const { dogs } = useDogs();

  const [entryType, setEntryType] = useState<'work' | 'walk'>('work');

  const [shiftDate, setShiftDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [crew, setCrew] = useState('');

  const [label, setLabel] = useState('');
  const [selectedDogId, setSelectedDogId] = useState<string | null>(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleSave = async () => {
    const shiftData = {
      type: entryType,
      start_time: formatTime(startTime),
      end_time: formatTime(endTime),
      shift_date: formatDate(shiftDate),
      crew: crew ? Number(crew) : null,
      label: entryType === 'work' ? label : null,
      dog_id: entryType === 'walk' ? (selectedDogId ? Number(selectedDogId) : null) : null,
    };

    const success = await addShift(shiftData);

    if (success) {
      router.push('/pages/Reservations');
    } else {
      Alert.alert('Fout', 'work kon niet worden toegevoegd.');
    }
  };

  const handleTypeChange = (type: 'work' | 'walk') => {
    setEntryType(type);
    setLabel('');
    setSelectedDogId(null);
  };

  if (loading) {
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
      <Text style={globalStyles.pageTitle}>Nieuwe {entryType === 'work' ? 'Taak' : 'Wandeling'}</Text>

      <View style={createShiftStyles.buttonContainer}>
        {['work', 'walk'].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => handleTypeChange(type as 'work' | 'walk')}
            style={[
              createShiftStyles.topShiftButtons,
              {
                backgroundColor: entryType === type ? '#F09D19' : '#F9E6C8',
              },
            ]}
          >
            <Text style={{ color: '#F8F3EC' }}>{type === 'work' ? 'Work' : 'Walk'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={globalStyles.section}>
        <View style={editProfileStyles.card}>

          {/* Datum */}
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

          {/* Crew */}
          <TouchableOpacity style={editProfileStyles.input}>
            <TextInput
              placeholder="Aantal crewleden"
              value={crew}
              onChangeText={setCrew}
              keyboardType="numeric"
            />
          </TouchableOpacity>

          {/* Alleen voor work */}
          {entryType === 'work' && (
            <TextInput
              style={editProfileStyles.input}
              placeholder="Label"
              value={label}
              onChangeText={setLabel}
            />
          )}

          {/* Alleen voor walk */}
          {entryType === 'walk' && (
            <>
              <Text style={{ marginBottom: 10 }}>Kies een hond:</Text>
              {dogs.map((dog) => (
                <TouchableOpacity
                  key={dog.id}
                  onPress={() => setSelectedDogId(dog.id)}
                  style={{
                    padding: 10,
                    backgroundColor: selectedDogId === dog.id ? '#F09D19' : '#F9E6C8',
                    borderRadius: 6,
                    marginBottom: 6,
                  }}
                >
                  <Text>{dog.name}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}

          <Button title="Opslaan" onPress={handleSave} />
        </View>
        <View style={globalStyles.m_space} />
      </View>
        <View style={globalStyles.m_space} />
    </PageLayout>
  );
};

export default ReservationAdd;
