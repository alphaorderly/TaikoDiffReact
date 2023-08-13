import * as React from 'react';
import { DifficultyList, Song } from '../../Consts/Songs';
import styled from 'styled-components';
import ScreenShotDiff from './ScreenShotDiff';

/**
 * 전반적인 스크린샷
 */

type Props = {
    rank: Song[],
    currentLevel: number,
}

const ScreenShot: React.FC<Props> = (props) => {

    const rank: Song[] = props.rank;
    const currentLevel = props.currentLevel;

    return (
        <ScreenShotDiv id='screenshot'>
            <Title id='screenshotName'>
                    태고의 달인 ⭐{props.currentLevel} by 
            </Title>
            {
                DifficultyList[currentLevel].map((difficulty) => {
                    return <ScreenShotDiff key={difficulty} difficulty={difficulty} rank={rank} currentLevel={currentLevel}/>
                })
            }
        </ScreenShotDiv>
    )
}

export default ScreenShot;

const ScreenShotDiv = styled.div`
    padding: 0px 20px 0px 10px;
    width: 2000px;
    display: none;
`

const Title = styled.p`
    font-family: taikoBold;
    font-size: 20px;
`