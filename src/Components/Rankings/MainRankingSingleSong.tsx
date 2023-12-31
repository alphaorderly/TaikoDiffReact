import React from 'react';
import { Ranks, clearedType, codeGeneration } from '../../States/Ranks';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { ref, set, update } from 'firebase/database';
import { db } from '../../Backend/Firebase';
import { getAuth } from 'firebase/auth';
import User from '../../States/User';
import { ClearStatus, Song, genreColor } from '../../Consts/Songs';
import clear from '../../Assets/images/clear.png'
import fullCombo from '../../Assets/images/fc.png'
import donderful from '../../Assets/images/fp.png'
import noClear from '../../Assets/images/nc.png'

type Prop = {
    index: number,
}

const getBackgroundColor = (stat: ClearStatus) => {
    let backgroundColor;
  
    switch (stat) {
      case ClearStatus.미클리어:
        backgroundColor = "#FAF3F0";
        break;
  
      case ClearStatus.클리어:
        backgroundColor = "#D4E2D4";
        break;
  
      case ClearStatus.풀콤:
        backgroundColor = "#FFCACC";
        break;
  
      case ClearStatus.전량:
        backgroundColor = "#DBC4F0";
        break;
    }

    backgroundColor += "CC";

    return css`
      background: ${backgroundColor};
    `;
  };

  /**
   * 
   * 개별 곡
   * 
   */

const MainRankingSingleSong: React.FC<Prop> = (props) => {

    const clearImages = [noClear, clear, fullCombo, donderful];

    const [ranks, setRanks] = useRecoilState(Ranks);

    const user = useRecoilValue(User);

    const getClears = async (songs: Song[]) => {
        const auth = getAuth();
        if(auth.currentUser) {
            let clearedData: clearedType[] = [];
            for(const song of songs) {
                clearedData.push({cleared: song.clear, code: codeGeneration(song)});
            }
            await set(ref(db, `/data/${user.uid}`), clearedData);
        }
    }
    

    return (
        <MainDiv ura={ranks[props.index].ura}>
            <TopDiv>
                <TitleDiv>
                    <Title>{ranks[props.index].jpnTitle}</Title>
                    <Title>{ranks[props.index].korTitle} <span style={{cursor: 'pointer'}} onClick={() => window.open(`https://www.youtube.com/results?search_query=${ranks[props.index].jpnTitle}`)}>📺</span></Title>
                </TitleDiv>
                <ClearDiv 
                    cleared={ranks[props.index].clear}
                    onClick={
                        () => {
                            setRanks((prev) => {
                                const after = prev.map(item => {
                                if(item.jpnTitle === ranks[props.index].jpnTitle && item.ura === ranks[props.index].ura) {
                                    return {
                                        ...item,
                                        clear: (item.clear + 1) % 4
                                    }
                                }
                                    return item;
                                });

                                getClears(after);

                                return after;
                        })
                    }}
                >
                    <ClearTitleText>
                        현재 상태
                    </ClearTitleText>
                    <ClearIcon src={clearImages[ranks[props.index].clear]} />
                </ClearDiv>
            </TopDiv>
            <InfoDiv>
                <Stat 
                    color={"#6a49ff".concat(ranks[props.index].info.double ? "FF" : "33")}
                >2인 보면</Stat>
                <Stat 
                    color={"#ed1c24".concat(ranks[props.index].info.personal ? "FF" : "33")}
                >개인차</Stat>
                <Stat 
                    color={"#a349a4".concat(ranks[props.index].info.hardFC ? "FF" : "33")}
                >풀콤 어려움</Stat>
                <Stat 
                    color={"#22b14c".concat(ranks[props.index].info.first ? "FF" : "33")}
                >초견 주의</Stat>
            </InfoDiv>
            <GenreDiv>
                    {
                        ranks[props.index].genre.map(
                            item => {
                                return <Genre genre={genreColor[item]}/>
                            }
                        )
                    }
            </GenreDiv>
        </MainDiv>
    )
}


const MainDiv = styled.div<{ura: boolean}>`
    width: 270px;
    margin: 0px;
    background-color: ${props => props.ura ? '#7519ec33' : '#fc258633'};
    border-radius: 15px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media screen and (max-width: 500px) {
        align-self: stretch;
        width: 100%;
    }
`

const TopDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const TitleDiv = styled.div`
    padding: 10px;
    width: 190px;
    overflow: wrap;
    font-weight: bold;
    font-family: rocknroll, NanumSquare;
`

const ClearDiv = styled.div<{cleared: ClearStatus}>`
    cursor: pointer;
    z-index: 10000;
    width: 50px;
    padding: 10px 10px 0px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top-right-radius: 15px;
    border-bottom-left-radius: 15px;
    ${({ cleared }) => getBackgroundColor(cleared)} 
    justify-content: space-around;
`

const ClearTitleText = styled.p`
    margin: 0px;
    font-family: taikoLight;
    font-size: 12px;
`

const Title = styled.p`
    margin: 0px;
    font-weight: bold;
    font-size: 0.7em;
`

const InfoDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 3px;
`

const Stat = styled.p<{color: string}>`
    margin: 4px;
    color: ${props => props.color || "white"};
    font-family: taikoLight;
    font-size: 12px;
`

const GenreDiv = styled.div`
    height: 10px;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    display: flex;
    flex-direction: row;
    overflow: hidden;
`

const Genre = styled.div<{genre: string}>`
    background-color: ${props => props.genre || "white"};
    flex: 1;
`

const ClearIcon = styled.img`
    width: 24px;
    margin: 5px 0px;
`

export default MainRankingSingleSong;