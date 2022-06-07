import { Category } from "./categories";

export interface Movimentation {
  id: string;
  name: string;
  value: number;
  category: Category;
  activity: "in" | "out";
  date: Date;
}
