import React from 'react';
import { Ranks } from '../../States/Ranks';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

type Prop = {
    level: number,
    difficulty: string,
    index: number,
}

const MainRankingSimpleSong: React.FC<Prop> = (props) => {

    const [ranks, setRanks] = useRecoilState(Ranks);

    const currentSong = ranks[props.level].rank[props.difficulty][props.index];

    return (
        <MainDiv ura={currentSong.ura}>
            <Title>{currentSong.jpnTitle}</Title>
            <Title>{currentSong.korTitle} {currentSong.playVideo && <span style={{cursor: 'pointer'}} onClick={() => window.open(currentSong.playVideo)}>📺</span>}</Title>
            <InfoDiv>
                <Stat 
                    color={"#ed1c24".concat(currentSong.info.personal ? "FF" : "33")}
                    onClick={() => {
                        setRanks((prev) => {
                                const changed = prev;
                                return changed;
                            }
                        )}
                    }
                >개인차</Stat>
                <Stat 
                    color={"#a349a4".concat(currentSong.info.hardFC ? "FF" : "33")}
                >풀콤 어려움</Stat>
                <Stat 
                    color={"#22b14c".concat(currentSong.info.first ? "FF" : "33")}
                >초견 주의</Stat>
            </InfoDiv>
        </MainDiv>
    )
}

const MainDiv = styled.div<{ura: boolean}>`
    width: 230px;
    margin: 10px;
    background-color: ${props => props.ura ? '#7519ec33' : '#fc258633'};
    padding: 2px 10px;
    border-radius: 15px;
`

const Title = styled.p`
    margin: 6px 0px;
    font-family: taikoBold;
`

const InfoDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 3px;
`

const Stat = styled.p<{color: string}>`
    margin: 0px;
    color: ${props => props.color || "white"};
    font-family: taikoLight;
`

export default MainRankingSimpleSong;