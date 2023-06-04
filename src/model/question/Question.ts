import { Tag } from "../tag/Tag";
import { User } from "../user/User";

export interface Question {
    id?: number;
    title?: string;
    description?: string;
    likes?: number;
    dislikes?: number;
    username?: string;
    tags?: (string | undefined)[];
    likedBy?: string[];
    dislikedBy?: string[];
    datePosted?: string;
    dateLastEdited?: string;
}