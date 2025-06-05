type UserProfile = {
  id?: string;
  first_name: string;
  last_name: string;
  phone: string | "";
  birthdate: Date | "";
  email: string;
  level: number;
  role: number;
  image: string | "";
};

export  default UserProfile;