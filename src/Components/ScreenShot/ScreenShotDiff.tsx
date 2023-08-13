import * as React from 'react';
import { ClearStatus, Difficulty, DifficultyList, Song, difficultyColor, genreColor } from '../../Consts/Songs';
import styled, { css } from 'styled-components';
import clear from '../../Assets/images/clear.png'
import fullCombo from '../../Assets/images/fc.png'
import donderful from '../../Assets/images/fp.png'
import noClear from '../../Assets/images/nc.png'

/**
 * 난이도별 스크린샷
 */

type Props = {
    rank: Song[],
    currentLevel: number,
    difficulty: Difficulty,
}

const backgroundColorPicker = (clear: ClearStatus) => {

    let backgroundColor = ""

    switch(clear) {
        case ClearStatus.미클리어:
            backgroundColor += "#FFFFFF";
            break;
        case ClearStatus.클리어:
            backgroundColor +="#9bc3c355";
            break;
        case ClearStatus.풀콤:
            backgroundColor +="#dfb32155";
            break;
        case ClearStatus.전량:
            backgroundColor += "linear-gradient(45deg, rgba(255,0,0,0.3) 0%, rgba(255,154,0,0.3) 10%, rgba(208,222,33,0.3) 20%, rgba(79,220,74,0.3) 30%, rgba(63,218,216,0.3) 40%, rgba(47,201,226,0.3) 50%, rgba(28,127,238,0.3) 60%, rgba(95,21,242,0.3) 70%, rgba(186,12,248,0.3) 80%, rgba(251,7,217,0.3) 90%, rgba(255,0,0,0.3) 100%)";
            break;
    }

    return css`
      background: ${backgroundColor};
    `
}

const ScreenShotDiff: React.FC<Props> = (props) => {

    const clearImages = [noClear, clear, fullCombo, donderful];

    const rank: Song[] = props.rank;
    const currentLevel = props.currentLevel;

    return (
        <DifficultyDiv color={difficultyColor[props.difficulty] + "88"}>
            <DifficultyTitleDiv color={difficultyColor[props.difficulty] + "88"}>
                <DifficultyTitle>{Difficulty[props.difficulty]}</DifficultyTitle>
            </DifficultyTitleDiv>
            <DifficultyContentDiv>
                {
                    rank.map((item, index) => {
                        if(item.difficulty == props.difficulty && item.level == props.currentLevel) {
                            return (
                                <SingleSongDiv key={item.jpnTitle + item.ura}>
                                    <SongDiv clear={item.clear}>
                                        <TitleDiv>
                                            <Title ura={item.ura}>{item.jpnTitle}</Title>
                                            <Title ura={item.ura}>{item.korTitle}</Title>
                                        </TitleDiv>
                                        <Clear>
                                            <ClearIcon src={clearImages[item.clear]} />
                                        </Clear>
                                    </SongDiv>
                                    <GenreDiv>
                                    {
                                        rank[index].genre.map(
                                            item => {
                                                return <Genre genre={genreColor[item]}/>
                                            }
                                        )
                                    }
                                    </GenreDiv>
                                </SingleSongDiv>
                            )
                        } else {
                            return null;
                        }
                    })
                }
            </DifficultyContentDiv>
        </DifficultyDiv>
    )
}

export default ScreenShotDiff;

const DifficultyDiv = styled.div<{color: string}>`
    border: ${props => props.color || 'white'} 5px solid;
    border-radius: 3px;
    margin: 10px 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
`

const DifficultyContentDiv = styled.div`
    flex: 1;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
`

const DifficultyTitleDiv = styled.div<{color: string}>`
    background: ${props => props.color || 'white'};
    height: 30px;
    display: flex;
    align-items: center;
`

const DifficultyTitle = styled.p`
    font-family: taikoBold;
`

const SingleSongDiv = styled.div`
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom: 1.4px solid black;
    border-right: 1.4px solid black;
`

const SongDiv = styled.div<{clear: ClearStatus}>`
    flex:1;
    padding: 5px;
    display: flex;
    flex-direction: row;
    ${({ clear }) => backgroundColorPicker(clear)}
    justify-content: space-between;
`

const TitleDiv = styled.div`
    
`

const GenreDiv = styled.div`
    height: 10px;
    display: flex;
    flex-direction: row;
    overflow: hidden;
`

const Genre = styled.div<{genre: string}>`
    background-color: ${props => props.genre || "white"};
    flex: 1;
`

const Title = styled.p<{ura: boolean}>`
    margin: 0px;
    font-family: rocknroll, taikoLight, NanumSquare;
    font-size: 1em;
    color: ${props => props.ura ? "#4B0082" : "black"}
`

const Clear = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ClearIcon = styled.img`
    width: 24px;
    margin: 5px 0px;
`
