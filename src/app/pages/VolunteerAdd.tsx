import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { globalStyles, editProfileStyles, colors } from "@styles/styles";
import PageLayout from '@layout/PageLayout';
import Button from '@components/Button';
import useAddUser from '@hooks/Users/useAddUser';
import { useRouter } from 'expo-router';

const VolunteerAdd = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const { addUser, loading } = useAddUser();

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    const result = await addUser(formData);
    if (result.success) {
      setFormData({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
      });

      router.push('/pages/Volunteers');
    }
  };

  return (
    <PageLayout>
      <Text style={globalStyles.pageTitle}>Vrijwilliger Toevoegen</Text>
      <View style={globalStyles.section}>
        <View style={editProfileStyles.card}>
          <TextInput
            style={editProfileStyles.input}
            placeholder="E-mail"
            placeholderTextColor={colors.orange_900}
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={editProfileStyles.input}
            placeholder="Wachtwoord"
            placeholderTextColor={colors.orange_900}
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry
          />
          <TextInput
            style={editProfileStyles.input}
            placeholder="Voornaam"
            placeholderTextColor={colors.orange_900}
            value={formData.first_name}
            onChangeText={(text) => handleChange("first_name", text)}
          />
          <TextInput
            style={editProfileStyles.input}
            placeholder="Achternaam"
            placeholderTextColor={colors.orange_900}
            value={formData.last_name}
            onChangeText={(text) => handleChange("last_name", text)}
          />
          <Button title="Opslaan" onPress={handleSubmit} loading={loading} />
        </View>
      </View>
      <View style={globalStyles.m_space} />
    </PageLayout>
  );
};

export default VolunteerAdd;
