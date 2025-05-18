type UserProfile = {
  id?: string;
  first_name: string;
  last_name: string;
  phone: string | "";
  birthdate: string | "";
  email: string;
  level: number;
  role: number;
};

export  default UserProfile;