import { User } from "types/user";

export type Movie = {
  id: number;
  movieId: number;
  text: string;
  user: User;
};
