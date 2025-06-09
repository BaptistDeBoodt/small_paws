import UserProfile from './UserProfile';

type ReservationInfoProps = {
  shiftId: string;
  crew: number;
  request: number;
  Dogs?: {
    level: number
  }
  profile: UserProfile;
  end_time: string;
  shift_date: string;
  dogLevel: number
}

export type { ReservationInfoProps };