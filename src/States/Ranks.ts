// 난이도 표 정보를 저장하는 상태입니다.

import {atom} from 'recoil';
import { recoilPersist } from 'recoil-persist';

// 장르, 난이도에 대한 enum type

export enum Genre {
    팝,
    키즈,
    애니메이션,
    보컬로이드,
    게임뮤직,
    버라이어티,
    클래식,
    남코오리지널,
}

export enum Difficulty {
    졸업플러스,
    졸업,
    최상,
    상,
    중상,
    중,
    중하,
    하,
    최하,
    보류,
}

export enum ClearStatus {
    미클리어,
    클리어,
    풀콤,
    전량
}

// 난이도별 색상
export const difficultyColor: { [props: number]: string } = {
    0 : "#800380",
    1 : "#b70e52",
    2 : "#ed1c24",
    3 : "#fe7f28",
    4 : "#fec90e",
    5 : "#22b14c",
    6 : "#0fa238",
    7 : "#a349a4",
    8 : "#484848",
    9 : "#000000",
}

// 레벨별 난이도 리스트
export const DifficultyList: {[props: number]: Difficulty[]} = {
    10 : [Difficulty.졸업플러스, Difficulty.졸업, Difficulty.최상, Difficulty.상, Difficulty.중상, Difficulty.중, Difficulty.중하, Difficulty.하, Difficulty.최하, Difficulty.보류]
}

// Recoil State / Type

export type Song = {
    jpnTitle: string,
    korTitle?: string,
    info: {
        personal: boolean,  // 개인차 큼 - 빨간색
        hardFC: boolean     // 풀콤 어려움, - 보라색
        double: boolean     // 2인용,
        first: boolean      // 초견 어려움 - 초록색
    },
    playVideo?: string,     // 전량 영상,
    genre: Genre[],         // 장르
    ura: boolean,           // 뒷보면 여부
    difficulty: Difficulty, // 난이도
    level: number,          // 레벨
    clear: ClearStatus    // 현재 상태
}

/*
{
    jpnTitle: "",
    korTitle: "",
    info: {
        personal:,  
        hardFC:,   
        double:,  
        first:,  
    },
    genre: [],         
    ura:,          
    difficulty: Difficulty.,
    clear: ClearStatus.미클리어,
    level:,       
}
*/

export const defaultRank: Song[] = [
    {
        jpnTitle: "彁",
        korTitle: "가",
        info: {
            personal:false,  
            hardFC: false,   
            double: false,  
            first:  true,  
        },
        genre: [Genre.남코오리지널],         
        ura: true,          
        difficulty: Difficulty.졸업플러스,
        clear: ClearStatus.미클리어,
        level: 10,       
    },
];

export const Ranks = atom<Song[]>(
    { 
        key: 'Ranks',
        default: defaultRank,
    }
)

// 백엔드 전송용 타입

export type clearedType = {
    code: string,                       // 곡 구분을 위한 코드, 일본어 곡제목 + ",ura:" + 우라여부 로 이루어진다.
    cleared: ClearStatus
}

export const codeGeneration = (song: Song): string => {
    return song.jpnTitle + ",ura:" + song.ura;
}