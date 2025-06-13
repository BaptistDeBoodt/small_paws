import Button from '@components/Button';
import Loading from '@components/Loading';
import PageLayout from '@layout/PageLayout';
import useUser from '@hooks/Users/useUser';
import useUpdateUser from '@hooks/Users/useUpdateUser';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { editProfileStyles, globalStyles, colors } from '@styles/styles';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import useImagePicker from '@hooks/Images/useImagePicker';
import { Image } from 'expo-image'

const EditProfile = () => {
  const { profile, loading } = useUser();
  const { updateProfile } = useUpdateUser();
  const { image, pickImage } = useImagePicker();
  const router = useRouter();

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone, setPhone] = useState<string>('');
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || '');
      setLastName(profile.last_name || '');
      setPhone(profile.phone || '');  // <-- hier: fallback naar lege string
      setBirthdate(profile.birthdate ? new Date(profile.birthdate) : null);
    }
  }, [profile]);

const handleSave = async () => {
  try {
    const updatedData: any = {
      first_name,
      last_name,
      phone,
      birthdate: birthdate ? birthdate.toISOString().split('T')[0] : '',
      image: image || profile?.image,
    };

    await updateProfile(updatedData);
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

          {/* Image picker + URL fallback */}
          <View style={editProfileStyles.image_container}>
            {image || profile?.image ? (
              <Image 
                source={{ uri: image || profile.image }}
                style={editProfileStyles.image}
              />
            ) : (
              <View style={editProfileStyles.image} />
            )}
            <Button title="Foto" onPress={pickImage} />
          </View>

          <TextInput
            style={editProfileStyles.input}
            placeholder="Voornaam"
            placeholderTextColor={colors.orange_900}
            value={first_name}
            onChangeText={setFirstName}
          />
          <TextInput
            style={editProfileStyles.input}
            placeholder="Familienaam"
            placeholderTextColor={colors.orange_900}
            value={last_name}
            onChangeText={setLastName}
          />
          <TextInput
            style={editProfileStyles.input}
            placeholder="Telefoonnummer"
            placeholderTextColor={colors.orange_900}
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
          />
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
                setShowDatePicker(false);
                if (date) setBirthdate(date);
              }}
            />
          )}
          <Button title="Opslaan" onPress={handleSave} />
        </View>
        <View style={globalStyles.m_space} />
      </View>
    </PageLayout>
  );
};

export default EditProfile;