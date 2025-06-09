import { reservationStyles, badgeStyles, globalStyles } from '@styles/styles';
import { View, Text, Alert } from 'react-native';
import Button from '@components/Button';
import { supabase } from '@utils/supabase';
import React, { useState, useEffect } from 'react';
import { ReservationInfoProps } from '@typefiles/ReservationInfoProps';
import { Image } from 'expo-image';
import useClaimedUsersForShift from '@hooks/ClaimedShifts/useClaimedUsersForShift';

const ReservationInfo = ({
  crew,
  request,
  shiftId,
  dogLevel,
  profile,
  end_time,
  shift_date,
}: ReservationInfoProps) => {
  const [currentRequest, setCurrentRequest] = useState<number>(request);
  const [loading, setLoading] = useState(false);
  const [hasReserved, setHasReserved] = useState(false);

  // Nieuwe state om tijdelijk de naam van de gebruiker als placeholder te bewaren
  const [localClaimedUser, setLocalClaimedUser] = useState<{ first_name: string; last_name: string } | null>(null);

  const { users: claimedUsers = [], loading: usersLoading } = useClaimedUsersForShift(shiftId);

  const isFull = currentRequest >= crew;

  const handleReserve = async () => {

    if (isFull) {
      Alert.alert('Volzet', 'Er zijn al genoeg vrijwilligers voor deze taak.');
      return;
    }

    if (dogLevel !== null && profile.level < dogLevel) {
      Alert.alert(
        'Niet toegestaan',
        'Je niveau is niet hoog genoeg om met deze hond te gaan wandelen.'
      );
      return;
    }

    setLoading(true);
    const userId = profile.id;

    if (!userId) {
      Alert.alert('Fout', 'Geen geldige gebruikers-ID gevonden.');
      setLoading(false);
      return;
    }

    const alreadyClaimed = claimedUsers.some((u) => u.user && u.user.id === userId);

    if (alreadyClaimed) {
      Alert.alert('Let op', 'Je hebt deze shift al geclaimd.');
      setHasReserved(true);
      setLoading(false);
      return;
    }

    const { error: updateError, data: updateData } = await supabase
      .from('Shifts')
      .update({ request: currentRequest + 1 })
      .eq('id', shiftId)
      .select();

    if (updateError) {
      Alert.alert('Fout', 'Er ging iets mis bij het reserveren.');
      setLoading(false);
      return;
    }

    const { error: insertError, data: insertData } = await supabase
      .from('Claimed_shifts')
      .insert({ user_id: userId, shift_id: shiftId })
      .select();

    setLoading(false);

    if (insertError) {
      if (insertError.code === '23505') {
        Alert.alert('Let op', 'Je hebt deze shift al geclaimd.');
      } else {
        Alert.alert('Fout', 'Kon de shift niet koppelen aan je account.');
        console.error('Insert error detail:', insertError);
      }
    } else {
      setCurrentRequest((prev) => prev + 1);
      setHasReserved(true);

      // Sla de naam tijdelijk op voor directe weergave
      setLocalClaimedUser({ first_name: profile.first_name, last_name: profile.last_name });

      Alert.alert('Succes', 'Je hebt je succesvol ingeschreven.');
    }
  };

  const now = new Date();
  const shiftEndDate = new Date(`${shift_date}T${end_time}`);
  const isPast = shiftEndDate < now;

  const badges = [
    null,
    require('@assets/images/icons/badge-green.svg'),
    require('@assets/images/icons/badge-orange.svg'),
    require('@assets/images/icons/badge-red.svg'),
  ];

  const badgeSource = dogLevel && dogLevel >= 1 && dogLevel <= 3 ? badges[dogLevel] : null;

  return (
    <View style={reservationStyles.card}>
      <View style={reservationStyles.switch}>
        <Text style={reservationStyles.count}>
          {currentRequest}/{crew}
        </Text>

        {dogLevel && badgeSource && (
          <Image style={[badgeStyles.badge, badgeStyles.new_badge]} source={badgeSource} />
        )}
      </View>

      {currentRequest > 0 && !usersLoading && (
        <View style={reservationStyles.namesContianer}>
          {/* Eerst tonen we de gebruiker die lokaal is toegevoegd als placeholder */}
          {localClaimedUser && (
            <Text style={reservationStyles.names} key="localUser">
              {localClaimedUser.first_name} {localClaimedUser.last_name}
            </Text>
          )}

          {/* Daarna tonen we de gebruikers uit de DB, filteren we lokale user uit om duplicaten te voorkomen */}
          {[...new Map(
            claimedUsers
              .filter((u) => u.user)
              // Optioneel: filter lokale user eruit als die hetzelfde is als localClaimedUser
              .filter((u) =>
                localClaimedUser
                  ? u.user.first_name !== localClaimedUser.first_name ||
                    u.user.last_name !== localClaimedUser.last_name
                  : true
              )
              .map((u) => [u.user.id, u])
          ).values()].map((u) => (
            <Text style={reservationStyles.names} key={u.user.id}>
              {u.user.first_name} {u.user.last_name}
            </Text>
          ))}
        </View>
      )}

      {!isFull && !hasReserved && !isPast && (
        <Button title="Reserveer" onPress={handleReserve} loading={loading} />
      )}
    </View>
  );
};

export default ReservationInfo;
