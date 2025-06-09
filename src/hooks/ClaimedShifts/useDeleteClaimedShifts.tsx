import { supabase } from '@utils/supabase';

const useDeleteClaimedShifts = () => {
  const deleteClaimedShiftsByDogId = async (dogId: string) => {

    // Stap 1: Haal alle shift_ids op voor de hond
    const { data: shifts, error: shiftError } = await supabase
      .from('Shifts')
      .select('id')
      .eq('dog_id', dogId);

    if (shiftError) {
      console.error('[DELETE DEBUG] Fout bij ophalen van shifts:', shiftError.message);
      throw new Error(shiftError.message);
    }

    if (!shifts || shifts.length === 0) {
      console.log('[DELETE DEBUG] Geen shifts gevonden voor dog_id:', dogId);
      return;
    }

    const shiftIds = shifts.map((s) => s.id);

    // Stap 2: Delete alle claimed shifts gekoppeld aan deze shift_ids
    const { error: deleteError, count } = await supabase
      .from('Claimed_shifts')
      .delete({ count: 'exact' })
      .in('shift_id', shiftIds);

    if (deleteError) {
      console.error('[DELETE DEBUG] Fout bij deleten van claimed_shifts:', deleteError.message);
      throw new Error(deleteError.message);
    }
  };

  return { deleteClaimedShiftsByDogId };
};

export default useDeleteClaimedShifts;
