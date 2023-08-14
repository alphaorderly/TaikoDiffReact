import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: "ChosenLevel",
})

export const ChosenLevel = atom<number>({
    key: "ChosenLevel",
    default: 10,
    effects: [persistAtom]
})