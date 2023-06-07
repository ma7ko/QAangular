import { Question } from "../question/Question";
import { User } from "../user/User";

export interface Answer {
    id?: number;
    explanation?: string;
    likes?: number;
    dislikes?: number;
    datePosted?: string;
    dateLastEdited?: string;
    questionId?: number;
    username?: string;
    likedBy?: string[];
    dislikedBy?: string[];
}