// 난이도 표 정보를 저장하는 상태입니다.

import {atom} from 'recoil';
import { ClearStatus, Song, defaultRank } from '../Consts/Songs';

// 장르, 난이도에 대한 enum type

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