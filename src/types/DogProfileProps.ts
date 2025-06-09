type DogProfileProps = {
  id: string;
  name: string;
  breed?: string;
  birthdate?: string;
  sex?: string;
  level?: number;
  reference?: number;
  image?: string;
  description?: string;
  healthy: boolean,
  adopted: boolean
};

export type { DogProfileProps };