// 난이도 표 정보를 저장하는 상태입니다.

import {atom} from 'recoil';

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

export const difficultyColor: { [props: string]: string } = {
    "졸업+" : "#800380",
    "졸업" : "#b70e52",
    "최상" : "#ed1c24",
    "상" : "#fe7f28",
    "중상" : "#fec90e",
    "중" : "#22b14c",
    "중하" : "#0fa238",
    "하" : "#a349a4",
    "최하" : "#484848",
    "보류" : "#000000",
}

export type Song = {
    jpnTitle: string,
    korTitle?: string,
    info: {
        personal: boolean,  // 개인차 큼 - 빨간색
        hardFC: boolean     // 풀콤 어려움, - 보라색
        double: boolean     // 2인용,
        first: boolean      // 초견 어려움 - 초록색
    },
    playVideo?: string,      // 전량 영상,
    genre: Genre[],         // 장르
    ura: boolean,           // 뒷보면 여부
}

export type RankElement = {
    [props: string]: Song[],
}

export type Rank = {
    [props: number]: {
        rank: RankElement,
        finalRevision: Date 
    }     
}

/*
복붙용 예시
{
    jpnTitle: "",
    korTitle: "",
    info: {
        personal: ,
        hardFC: ,
        double: ,
        first: ,
    },
    genre: [],
    ura: ,
}
*/

export const Ranks = atom<Rank>(
    { 
        key: 'Ranks',
        default: {
            10: {
                rank: {
                    "졸업+": [
                        {
                            jpnTitle: "彁",
                            korTitle: "가",
                            info: {
                                personal: false,
                                hardFC: false,
                                double: false,
                                first: true,
                            },
                            playVideo: "https://www.youtube.com/watch?v=LI1TZONsLag",
                            genre: [Genre.남코오리지널],
                            ura: true,
                        }
                    ],
                    "졸업": [
                        {
                            jpnTitle: "ダンガンノーツ",
                            korTitle: "탄환노트",
                            info: {
                                personal: false,
                                hardFC: false,
                                double: false,
                                first: false,
                            },
                            genre: [Genre.남코오리지널],
                            ura: true,
                        }
                    ]
                },
                finalRevision: new Date(2023, 7, 12)
            }
        }
    }
)