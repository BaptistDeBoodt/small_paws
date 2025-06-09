import FilterLogic from '@components/dogProfile/filterSection/FilterLogic';
import Switch from '@components/Switch';
import WalkShiftCard from '@components/WalkShiftCard';
import { dogProfileFilterStyles } from '@styles/styles';
import React from 'react';
import { ScrollView, Text } from 'react-native';
import useUpdateDog from '@hooks/Dogs/useUpdateDog';
import { useState } from 'react';
import { Alert } from 'react-native';
import useDeleteClaimedShifts from '@hooks/ClaimedShifts/useDeleteClaimedShifts';

type DogProfileProps = {
  id: string,
  description?: string;
  shifts?: any[];
  role?: number;
  healthy: boolean;
};

export default function DogProfileFilter({ id, healthy, role, description, shifts = [] }: DogProfileProps) {
  const now = new Date();
  const { updateDog } = useUpdateDog();
  const { deleteClaimedShiftsByDogId } = useDeleteClaimedShifts();
  const [isHealthy, setIsHealthy] = useState(healthy);

  const toggleHealthy = async () => {
    try {
      if (isHealthy) {
        await deleteClaimedShiftsByDogId(id);
      }
      await updateDog(id, { healthy: !isHealthy });
      setIsHealthy(!isHealthy); // update lokale state om stijl aan te passen
    } catch (error: any) {
      Alert.alert('Fout bij updaten', error.message);
    }
  };

  const futureShifts = shifts.filter((shift) => {
    if (!shift.shift_date || !shift.start_time) return false;
    const shiftStart = new Date(`${shift.shift_date}T${shift.start_time}`);
    return shiftStart > now;
  });

  return (
    <ScrollView>
      <FilterLogic title="Beschrijving">
        <Text>{description}</Text>
      </FilterLogic>

      {futureShifts.map((shift, index) => (
        <WalkShiftCard
          key={index}
          id={shift.id}
          type={shift.type}
          start_time={shift.start_time}
          end_time={shift.end_time}
          shift_date={shift.shift_date}
          crew={shift.crew}
          dogName={shift.Dogs?.name ?? 'Onbekende hond'}
          dogHealth={isHealthy} // <--- direct gebonden aan lokale toggle
        />
      ))}

      {role === 1 && (
        <FilterLogic title="Beschikbaarheid">
          <Switch value={isHealthy} onValueChange={toggleHealthy} />
          <Text style={dogProfileFilterStyles.subtitle}>Disclaimer:</Text>
          <Text>
            Bij het uitschakelen van de toggleknop worden alle geplande wandelshifts met de hond automatisch geannuleerd. De hond wordt opnieuw beschikbaar gesteld zodra de toggleknop weer wordt ingeschakeld.
          </Text>
        </FilterLogic>
      )}
    </ScrollView>
  );
}
