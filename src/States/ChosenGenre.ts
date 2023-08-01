import { atom } from "recoil";
import { Genre } from "../Consts/Songs";

export const ChosenGenre = atom<Genre | null>({
    key: "ChosenGenre",
    default: undefined,
})