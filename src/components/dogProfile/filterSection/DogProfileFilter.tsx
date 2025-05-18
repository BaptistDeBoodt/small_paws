import FilterLogic from '@components/dogProfile/filterSection/FilterLogic';
import Switch from '@components/Switch';
import WalkShiftCard from '@components/WalkShiftCard';
import { dogProfileFilterStyles } from '@styles/styles';
import React from 'react';
import { ScrollView, Text } from 'react-native';

type DogProfileProps = {
  description?: string;
  shifts?: any[];
};

export default function DogProfileFilter({ description, shifts = [] }: DogProfileProps) {
  return (
    <ScrollView>
      <FilterLogic title="Beschrijving">
        <Text>
          {description}
        </Text>
      </FilterLogic>

      <FilterLogic title="Wandelingen">
        {shifts.length === 0 ? (
          <Text>Geen geplande wandelingen</Text>
        ) : (
          shifts.map((shift, index) => (
            <WalkShiftCard
              key={index}
              id={shift.id}
              type={shift.type}
              start_time={shift.start_time}
              end_time={shift.end_time}
              shift_date={shift.shift_date}
              crew={shift.crew}
              dogName={shift.Dogs?.name ?? 'Onbekende hond'}
            />
          ))
        )}
      </FilterLogic>

      <FilterLogic title="Beschikbaarheid">
        <Switch />
        <Text style={dogProfileFilterStyles.subtitle}>
          Disclaimer:
        </Text>
        <Text>
          Bij het uitschakelen van de toggleknop worden alle geplande wandelshifts met de hond automatisch geannuleerd. De betreffende gebruikers ontvangen hiervan een melding, inclusief de opgegeven reden. De hond wordt opnieuw beschikbaar gesteld zodra de toggleknop weer wordt ingeschakeld.
        </Text>
      </FilterLogic>
    </ScrollView>
  );
}
