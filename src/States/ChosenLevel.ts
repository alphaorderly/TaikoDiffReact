import { atom } from "recoil";

export const ChosenLevel = atom<number>({
    key: "ChosenLevel",
    default: 10,
})