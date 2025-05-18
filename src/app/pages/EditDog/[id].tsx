import Button from '@components/Button';
import Loading from '@components/Loading';
import useDog from '@hooks/Dogs/useDog';
import useUpdateDog from '@hooks/Dogs/useUpdateDog';
import PageLayout from '@layout/PageLayout';
import { editProfileStyles, globalStyles } from '@styles/styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const DogEdit = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { dog, loading, error } = useDog(id as string);
  const { updateDog } = useUpdateDog();

  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [sex, setSex] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [level, setLevel] = useState('');
  const [reference, setReference] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (dog) {
      setName(dog.name ?? '');
      setBreed(dog.breed ?? '');
      setSex(dog.sex ?? '');
      setBirthdate(dog.birthdate ?? '');
      setLevel(dog.level?.toString() ?? '');
      setReference(dog.reference?.toString() ?? '');
      setDescription(dog.description ?? '');
      setImage(dog.image ?? '');
    }
  }, [dog]);

  const handleSave = async () => {
    try {
      await updateDog(id as string, {
        name,
        breed,
        sex,
        birthdate,
        level: level ? Number(level) : undefined,
        reference: reference ? Number(reference) : undefined,
        description,
        image,
      });
      router.push({ pathname: '/pages/DogDetail/[id]', params: { id } });
    } catch (err) {
      console.error('Fout bij opslaan:', err);
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

export default DogEdit;
