type ShiftTypeProps = {
  id?: string;
  type: string;
  start_time: string;
  end_time: string;
  shift_date: string;
  crew?: number;
  request?: number;
  label: string;
  Dogs?: {
    id: string;
    name: string;
  };
};

export type { ShiftTypeProps };