export type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type CreditResponse = {
  cast: Cast[];
};
