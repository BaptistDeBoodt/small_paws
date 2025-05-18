type ClaimedShifts = {
  shift_id?: string;
  Shifts: {
    id: string;
    type: string;
    start_time: string;
    end_time: string;
    shift_date: string;
    crew: number;
    label: string;
    Dogs: {
      name: string;
    } | null;
  };
};

export type { ClaimedShifts };