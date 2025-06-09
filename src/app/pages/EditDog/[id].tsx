import Button from '@components/Button';
import Loading from '@components/Loading';
import useDog from '@hooks/Dogs/useDog';
import useUpdateDog from '@hooks/Dogs/useUpdateDog';
import useImagePicker from '@hooks/Images/useImagePicker';
import PageLayout from '@layout/PageLayout';
import { editProfileStyles, globalStyles } from '@styles/styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Image } from 'expo-image';

const DogEdit = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { dog, loading } = useDog(id as string);
  const { updateDog } = useUpdateDog();
  const { image: pickedImage, pickImage } = useImagePicker();

  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [sex, setSex] = useState('');
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [level, setLevel] = useState('');
  const [reference, setReference] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [adopted, setAdopted] = useState(false);

  useEffect(() => {
    if (dog) {
      setName(dog.name ?? '');
      setBreed(dog.breed ?? '');
      setSex(dog.sex ?? '');
      setBirthdate(dog.birthdate ? new Date(dog.birthdate) : null);
      setLevel(dog.level?.toString() ?? '');
      setReference(dog.reference?.toString() ?? '');
      setDescription(dog.description ?? '');
      setImage(dog.image ?? '');
      setAdopted(dog.adopted ?? false);
    }
  }, [dog]);

  const handleSave = async () => {
    if (!name.trim() || !sex || !level.trim()) {
      Alert.alert('Verplichte velden', 'Naam, geslacht en niveau zijn verplicht.');
      return;
    }

    try {
      await updateDog(id as string, {
        name,
        breed,
        sex,
        birthdate: birthdate ? birthdate.toISOString().split('T')[0] : '',
        level: level ? Number(level) : undefined,
        reference: reference ? Number(reference) : undefined,
        description,
        image: pickedImage || image,
        adopted,
      });
      router.push({
        pathname: '/pages/DogDetail/[id]',
        params: { id: typeof id === 'string' ? id : id?.[0] ?? '' }
      });
    } catch (err) {
      console.error('Fout bij opslaan:', err);
      Alert.alert('Fout', 'Hond kon niet worden opgeslagen.');
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
      <Text style={globalStyles.pageTitle}>Hond Aanpassen</Text>
      <View style={globalStyles.section}>
        <View style={editProfileStyles.card}>
          
          {/* Image preview and picker */}
          <View style={editProfileStyles.image_container}>
            {pickedImage || image ? (
              <Image
                source={{ uri: pickedImage || image }}
                style={editProfileStyles.image}
              />
            ) : (
              <View style={editProfileStyles.image} />
            )}
            <Button title="Foto" onPress={pickImage} />
          </View>

          <TextInput
            style={editProfileStyles.input}
            placeholder="Naam"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={editProfileStyles.input}
            placeholder="Ras"
            value={breed}
            onChangeText={setBreed}
          />

          {/* Geslacht als radio buttons */}
          <View style={editProfileStyles.radio_button_container}>
            <TouchableOpacity
              style={editProfileStyles.radio_buttons}
              onPress={() => setSex('male')}
            >
              <View style={editProfileStyles.button}>
                {sex === 'male' && <View style={editProfileStyles.inside_button} />}
              </View>
              <Text>Mannelijk</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={editProfileStyles.radio_buttons}
              onPress={() => setSex('female')}
            >
              <View style={editProfileStyles.button}>
                {sex === 'female' && <View style={editProfileStyles.inside_button} />}
              </View>
              <Text>Vrouwelijk</Text>
            </TouchableOpacity>
          </View>

          {/* Geboortedatum */}
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

          {/* Level (1-3 only) */}
          <TextInput
            style={editProfileStyles.input}
            placeholder="Level (1-3)"
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
            value={reference}
            onChangeText={setReference}
            keyboardType="numeric"
          />

          <TextInput
            style={[editProfileStyles.input, editProfileStyles.long_input]}
            placeholder="Beschrijving"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <TouchableOpacity
            style={editProfileStyles.checkboxContainer}
            onPress={() => {
              if (!adopted) {
                Alert.alert(
                  'Adoptie bevestigen',
                  'Als je doorgaat, zal deze hond niet meer zichtbaar zijn in het overzicht van alle honden.',
                  [
                    { text: 'Annuleren', style: 'cancel' },
                    { text: 'Doorgaan', onPress: () => setAdopted(true) },
                  ]
                );
              } else {
                setAdopted(false);
              }
            }}
          >
            <View style={editProfileStyles.checkbox}>
              {adopted && <View style={editProfileStyles.checked} />}
            </View>
            <Text style={editProfileStyles.checkboxLabel}>Vink mij aan bij adoptie</Text>
          </TouchableOpacity>
          
          <Button title="Opslaan" onPress={handleSave} />
        </View>
        <View style={globalStyles.m_space} />
      </View>
      <View style={globalStyles.m_space} />
      <View style={globalStyles.m_space} />
    </PageLayout>
  );
};

export default DogEdit;
