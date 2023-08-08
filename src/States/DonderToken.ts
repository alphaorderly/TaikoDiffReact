import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: "DonderToken",
})

export const DonderToken = atom<string>({
    key: "DonderToken",
    default: "",
    effects: [persistAtom]
})