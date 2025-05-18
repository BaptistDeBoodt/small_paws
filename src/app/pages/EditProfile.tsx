import Button from '@components/Button';
import Loading from '@components/Loading';
import PageLayout from '@layout/PageLayout';
import useUser from '@hooks/Users/useUser';
import useUpdateUser from '@hooks/Users/useUpdateUser';
import { globalStyles } from '@styles/globalStyles';
import { Text, View, TextInput } from 'react-native';
import { editProfileStyles } from '@styles/styles';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

const EditProfile = () => {
  const { profile, loading } = useUser();
  const { updateProfile } = useUpdateUser();
  const router = useRouter();

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
      setEmail(profile.email);
      setPhone(profile.phone);
      setBirthdate(profile.birthdate);
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      await updateProfile({ first_name, last_name, phone, birthdate });
      router.push('/pages/Profile');
    } catch (err) {
      console.error('Fout bij opslaan:', err);
    }
  };

  if (loading)
  return (
    <PageLayout>
      <View style={globalStyles.section}>
      <Loading />
      </View>
    </PageLayout>
  );

  return (
    <PageLayout>
      <Text style={globalStyles.pageTitle}>Profiel Aanpassen</Text>
      <View style={globalStyles.section}>
        <View style={editProfileStyles.card}>
          <TextInput
            style={editProfileStyles.input}
            placeholder="Voornaam"
            value={first_name}
            onChangeText={setFirstName}
          />
          <TextInput
            style={editProfileStyles.input}
            placeholder="Familienaam"
            value={last_name}
            onChangeText={setLastName}
          />
          <TextInput
            style={editProfileStyles.input}
            placeholder="Email"
            value={email}
            editable={false}
          />
          <TextInput
            style={editProfileStyles.input}
            placeholder="Telefoonnummer"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            style={editProfileStyles.input}
            placeholder="Geboortedatum"
            value={birthdate}
            onChangeText={setBirthdate}
          />
          <Button title="Opslaan" onPress={handleSave} />
        </View>
        <View style={globalStyles.m_space} />
      </View>
    </PageLayout>
  );
};

export default EditProfile;