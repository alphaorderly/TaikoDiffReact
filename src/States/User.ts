import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";


type LoginStatus = {
    loggedIn: boolean,
    name: string | null,
    uid: string | null,
}

const { persistAtom } = recoilPersist({
    key: "UserInformation",
})

export default atom<LoginStatus>({
    key: "User",
    default: {
        loggedIn: false,
        name: null,
        uid: null,
    },
    effects: [persistAtom]
})