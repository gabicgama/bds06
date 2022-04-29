import { User } from "types/user";

export type Review = {
  id: number;
  movieId: number;
  text: string;
  user: User;
};
