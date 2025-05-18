import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { FilterLogic, ShiftCard, Switch } from '@components/components';
import { dogProfileFilterStyles } from '@styles/styles';

export default function DogProfileFilter() {
  return (
    <ScrollView>
      <FilterLogic title="Beschrijving">
        <Text>
          Scooby Doo is een energieke, intelligente hond die veel beweging nodig heeft en graag werkt. Hij is sterk aan de lijn en kan uit enthousiasme trekken, vooral in het begin van de wandeling. Hij reageert fel op andere honden, katten en snel bewegende objecten zoals fietsen en joggers. Het is daarom belangrijk om waakzaam te zijn en voldoende afstand te houden van prikkels.
          <View style={dogProfileFilterStyles.br}/>
          Scooby Doo heeft duidelijke grenzen nodig en voelt zich het prettigst bij een zelfzekere, rustige begeleider die ervaring heeft met krachtige of reactieve honden. Hij draagt standaard een goed passende tuig en eventueel een gentle leader voor extra controle. Wandelen met Max vereist focus en geduld — beloningen werken goed, vooral voor gewenst gedrag zoals rust aan de lijn.
          <View style={dogProfileFilterStyles.br}/>
          Scooby Doo kan (nog) niet loslopen en moet altijd goed aangelijnd blijven, ook op omheinde terreinen tenzij vooraf anders afgesproken met het team.
        </Text>
      </FilterLogic>

      <FilterLogic title="Wandelingen">
        <ShiftCard />
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
