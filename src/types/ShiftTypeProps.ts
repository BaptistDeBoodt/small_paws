type ShiftTypeProps = {
  id?: string;
  type: 'walk' | 'work';
  start_time: string;
  end_time: string;
  shift_date: string;
  crew?: number;
  request?: number;
  label: string;
  Dogs?: {
    id: string;
    name: string;
    healthy: boolean;
  };
  dogName?: string;
  dogId: string | number | null;
  dogHealth: boolean;
};

export type { ShiftTypeProps };