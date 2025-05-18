import { reservationStyles } from '@styles/styles';
import { View, Text, Alert } from 'react-native';
import Button from '@components/Button';
import { supabase } from '@utils/supabase';
import React, { useState } from 'react';
import { ReservationInfoProps } from '@typefiles/ReservationInfoProps';

const ReservationInfo = ({ crew, request, shiftId }: ReservationInfoProps) => {
  const [currentRequest, setCurrentRequest] = useState<number>(request);
  const [loading, setLoading] = useState(false);

  const isFull = currentRequest >= crew;

  const handleReserve = async () => {
    if (isFull) {
      Alert.alert('Volzet', 'Er zijn al genoeg vrijwilligers voor deze taak.');
      return;
    }

    setLoading(true);

    // Step 1: Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      Alert.alert('Fout', 'Gebruiker niet ingelogd.');
      console.error(userError);
      setLoading(false);
      return;
    }

    // Step 2: Update request count
    const { error: updateError } = await supabase
      .from('Shifts')
      .update({ request: currentRequest + 1 })
      .eq('id', shiftId);

    if (updateError) {
      Alert.alert('Fout', 'Er ging iets mis bij het reserveren.');
      console.error(updateError);
      setLoading(false);
      return;
    }

    // Step 3: Create Claimed_shift
    const { error: insertError } = await supabase
      .from('Claimed_shifts')
      .insert({
        user_id: user.id,
        shift_id: shiftId,
      });

    setLoading(false);

    if (insertError) {
      Alert.alert('Fout', 'Kon de shift niet koppelen aan je account.');
      console.error(insertError);
    } else {
      setCurrentRequest((prev) => prev + 1);
      Alert.alert('Succes', 'Je hebt je succesvol ingeschreven.');
    }
  };

  return (
    <View style={reservationStyles.card}>
      <Text style={reservationStyles.count}>
        {currentRequest}/{crew}
      </Text>

      {!isFull && (
        <Button
          title="Reserveer"
          onPress={handleReserve}
        />
      )}
    </View>
  );
};

export default ReservationInfo;
