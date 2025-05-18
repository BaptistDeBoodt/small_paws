import Button from '@components/Button';
import Loading from '@components/Loading';
import useAddDog from '@hooks/Dogs/useAddDog';
import PageLayout from '@layout/PageLayout';
import { globalStyles } from '@styles/globalStyles';
import { editProfileStyles } from '@styles/styles';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';

const DogAdd = () => {
  const router = useRouter();
  const { addDog, loading } = useAddDog();

  // State voor form fields
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [sex, setSex] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [level, setLevel] = useState('');
  const [reference, setReference] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  

  const handleSave = async () => {
    const success = await addDog({
      name,
      breed,
      sex,
      birthdate,
      level: level ? Number(level) : undefined,
      reference: reference ? Number(reference) : undefined,
      description,
      image,
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
          <TextInput
            style={editProfileStyles.input}
            placeholder="Geslacht"
            value={sex}
            onChangeText={setSex}
          />
          <TextInput
            style={editProfileStyles.input}
            placeholder="Geboortedatum (YYYY-MM-DD)"
            value={birthdate}
            onChangeText={setBirthdate}
          />
          <TextInput
            style={editProfileStyles.input}
            placeholder="Level (nummer)"
            value={level}
            onChangeText={setLevel}
            keyboardType="numeric"
          />
          <TextInput
            style={editProfileStyles.input}
            placeholder="Referentie (nummer)"
            value={reference}
            onChangeText={setReference}
            keyboardType="numeric"
          />
          <TextInput
            style={editProfileStyles.input}
            placeholder="Beschrijving"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <TextInput
            style={editProfileStyles.input}
            placeholder="Image URL"
            value={image}
            onChangeText={setImage}
          />

          <Button title="Opslaan" onPress={handleSave} />
          </View>
        </View>
        <View style={globalStyles.m_space} />
    </PageLayout>
  );
};

export default DogAdd;
