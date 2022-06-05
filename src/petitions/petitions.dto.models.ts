export interface CreatePetitionDTO {
  game: string;
  user: string;
  status: string;
}

export interface UpdatePetitionDTO {
  status: string;
}

export interface PetitionDTO {
  game: string;
  user: string;
  status: string;
  date: string;
}
