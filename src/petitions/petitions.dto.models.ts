export interface CreatePetitionDTO {
  game: string;
  sender: string;
  receptor: string;
  status: string;
}

export interface UpdatePetitionDTO {
  status: string;
}

export interface PetitionDTO {
  game: string;
  sender: string;
  receptor: string;
  status: string;
  date: string;
}
