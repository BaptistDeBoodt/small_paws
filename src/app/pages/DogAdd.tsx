import Button from '@components/Button';
import Loading from '@components/Loading';
import useAddDog from '@hooks/Dogs/useAddDog';
import useImagePicker from '@hooks/Images/useImagePicker';
import PageLayout from '@layout/PageLayout';
import DateTimePicker from '@react-native-community/datetimepicker';
import { editProfileStyles, globalStyles, colors } from '@styles/styles';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

const DogAdd = () => {
  const router = useRouter();
  const { addDog, loading } = useAddDog();
  const { image, pickImage } = useImagePicker();

  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [sex, setSex] = useState('');
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [level, setLevel] = useState('');
  const [reference, setReference] = useState('');
  const [description, setDescription] = useState('');
  

  const handleSave = async () => {
    if (!name.trim() || !sex || !level.trim()) {
      Alert.alert('Verplichte velden', 'Naam, geslacht en niveau zijn verplicht.');
      return;
    }
    const success = await addDog({
      name,
      breed,
      sex,
      birthdate: birthdate ? birthdate.toISOString().split('T')[0] : '',
      level: level ? Number(level) : undefined,
      reference: reference ? Number(reference) : undefined,
      description,
      image: image,
    });
    if (success) {
      router.push('/pages/Dogs');
    } else {
      Alert.alert('Fout', 'Hond kon niet worden toegevoegd.');
    }
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
      <Text style={globalStyles.pageTitle}>Hond Toevoegen</Text>
        <View style={globalStyles.section}>
        <View style={editProfileStyles.card}>

          {/* Image picker + URL fallback */}
          <View style={editProfileStyles.image_container}>
            {image ? (
              <Image 
                source={{ uri: image }}
                style={editProfileStyles.image}
              />
            ) : <View style={editProfileStyles.image}/>}
            <Button title="Foto" onPress={pickImage} />
          </View>

          <TextInput
            style={editProfileStyles.input}
            placeholder="Naam"
            placeholderTextColor={colors.orange_900}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={editProfileStyles.input}
            placeholder="Ras"
            placeholderTextColor={colors.orange_900}
            value={breed}
            onChangeText={setBreed}
          />

          <View style={editProfileStyles.radio_button_container}>
            <TouchableOpacity
              style={editProfileStyles.radio_buttons}
              onPress={() => setSex('male')}
            >
              <View style={editProfileStyles.button}>
                {sex === 'male' && (
                  <View style={editProfileStyles.inside_button}/>
                )}
              </View>
              <Text>Mannelijk</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={editProfileStyles.radio_buttons}
              onPress={() => setSex('female')}
            >
            <View style={editProfileStyles.button}>
              {sex === 'female' && (
                <View style={editProfileStyles.inside_button}/>
              )}
            </View>
              <Text>Vrouwelijk</Text>
            </TouchableOpacity>
          </View>


          {/* Geboortedatum met date picker */}
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={editProfileStyles.input}
          >
            <Text>{birthdate ? birthdate.toISOString().split('T')[0] : 'Geboortedatum kiezen'}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={birthdate || new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDatePicker(Platform.OS === 'ios');
                if (date) setBirthdate(date);
              }}
            />
          )}

          {/* Level: alleen 1-3 */}
          <TextInput
            style={editProfileStyles.input}
            placeholder="Level (1-3)"
            placeholderTextColor={colors.orange_900}
            value={level}
            onChangeText={text => {
              if (/^[1-3]?$/.test(text)) setLevel(text);
            }}
            keyboardType="numeric"
            maxLength={1}
          />

          <TextInput
            style={editProfileStyles.input}
            placeholder="Referentie (nummer)"
            placeholderTextColor={colors.orange_900}
            value={reference}
            onChangeText={setReference}
            keyboardType="numeric"
          />

          <TextInput
            style={[editProfileStyles.input, editProfileStyles.long_input]}
            placeholder="Beschrijving"
            placeholderTextColor={colors.orange_900}
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <Button title="Opslaan" onPress={handleSave} />
          </View>
        </View>
        <View style={globalStyles.m_space} />
        <View style={globalStyles.m_space} />
    </PageLayout>
  );
};

export default DogAdd;
