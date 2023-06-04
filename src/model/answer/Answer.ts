import { Question } from "../question/Question";
import { User } from "../user/User";

export interface Answer {
    id?: number;
    explanation?: string;
    likes?: number;
    dislikes?: number;
    posted?: string;
    lastEdited?: string;
    questionId?: number;
    username?: string;
    likedByUsers?: User[];
    dislikedByUsers?: User[];
}