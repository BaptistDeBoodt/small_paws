import { supabase } from '@utils/supabase';

export const useAutoGenerateWalkShifts = () => {
  const generateShifts = async (startTime: string, endTime: string, startDate: Date) => {
    const { data: dogs, error: dogError } = await supabase
      .from('Dogs')
      .select('id')
      .eq('adopted', false);

    if (dogError) {
      console.error('[🐶] Fout bij ophalen van honden:', dogError.message);
      return false;
    }

    const newShifts = [];

    for (const dog of dogs) {
      for (let i = 0; i < 7; i++) {
        const shiftDate = new Date(startDate);
        shiftDate.setDate(startDate.getDate() + i); // elke dag van de week

        newShifts.push({
          type: 'walk',
          dog_id: dog.id,
          shift_date: shiftDate.toISOString().split('T')[0],
          start_time: startTime,
          end_time: endTime,
          crew: 1,
          request: 0,
          label: null,
        });
      }
    }

    if (newShifts.length === 0) {
      console.log('🚫 Geen honden gevonden om shifts aan te maken.');
      return false;
    }

    const { error: insertError } = await supabase
      .from('Shifts')
      .insert(newShifts);

    if (insertError) {
      console.error('[🚨] Fout bij toevoegen van shifts:', insertError.message);
      return false;
    }

    console.log(`✅ ${newShifts.length} shifts succesvol aangemaakt.`);
    return true;
  };

  return { generateShifts };
};
