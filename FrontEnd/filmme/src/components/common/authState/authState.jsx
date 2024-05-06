// Recoil : React 애플리케이션을 위한 상태 관리 
// 라이브러리 전역 상태 관리를 간단하게 할 수 있게 도와주는 것

import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom({
    key: "userState",
    default: null,
    effects_UNSTABLE: [persistAtom]
});