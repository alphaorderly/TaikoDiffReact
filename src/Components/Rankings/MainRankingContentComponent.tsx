import React, { useState } from 'react';
import styled from 'styled-components';
import {  Ranks } from '../../States/Ranks';
import { useRecoilState, useRecoilValue } from 'recoil';
import MainRankingSingleSong from './MainRankingSingleSong';
import { ClearStatus, Difficulty, difficultyColor } from '../../Consts/Songs';
import clear from '../../Assets/images/clear.png'
import fullCombo from '../../Assets/images/fc.png'
import donderful from '../../Assets/images/fp.png'
import { ChosenGenre } from '../../States/ChosenGenre';

type Prop = {
    level: number,
    difficulty: Difficulty,
    searchTag: string
}

/**
 * 
 * 난이도명과 곡들
 * 
 */

const MainRankingContentComponent: React.FC<Prop> = (props: Prop) => {

    const [currentRank, setCurrentRank] = useRecoilState(Ranks);

    const chosenGenre = useRecoilValue(ChosenGenre);

    if(currentRank.filter((item, index) => {
        if(item.difficulty == props.difficulty && item.level == props.level && props.searchTag.length === 0 && chosenGenre === null) {
            return true
        } else if (item.difficulty == props.difficulty && item.level == props.level && (item.jpnTitle.toLowerCase().includes(props.searchTag) || item.korTitle?.toLowerCase().includes(props.searchTag)) && item.genre.includes(chosenGenre!)) {
            return true
        } else {
            return false;
        }
    }).length === 0) {
        return null;
    }

    return (
        <MainDiv>
            <TopDiv>
                <DiffDiv color={difficultyColor[props.difficulty] + "88"}>
                    <DiffTitle>{Difficulty[props.difficulty]}</DiffTitle>
                </DiffDiv>
                <ClearedDiv>
                    <CrownIcon src={clear}/>
                    <CrownText>{currentRank.filter(item => (item.clear === ClearStatus.클리어) && (item.difficulty === props.difficulty)).length}</CrownText>
                    <CrownIcon src={fullCombo}/>
                    <CrownText>{currentRank.filter(item => (item.clear === ClearStatus.풀콤)  && (item.difficulty === props.difficulty)).length}</CrownText>
                    <CrownIcon src={donderful}/>
                    <CrownText>{currentRank.filter(item => (item.clear === ClearStatus.전량) && (item.difficulty === props.difficulty)).length}</CrownText>
                </ClearedDiv>
            </TopDiv>
            <DiffContent>
                {
                    currentRank.map((item, index) => {
                        if(item.difficulty == props.difficulty && item.level == props.level && props.searchTag.length === 0 && chosenGenre === null) {
                            return <MainRankingSingleSong index={index} />
                        } else if (item.difficulty == props.difficulty && item.level == props.level && (item.jpnTitle.toLowerCase().includes(props.searchTag) || item.korTitle?.toLowerCase().includes(props.searchTag)) && item.genre.includes(chosenGenre!)) {
                            return <MainRankingSingleSong index={index} />
                        } else {
                            return null;
                        }
                    })
                }
            </DiffContent>
        </MainDiv>
    )
}

const MainDiv = styled.div`
    margin: 20px 0px 0px 0px;
`

const TopDiv = styled.div`
    display: flex;
    justify-content: flex-start;
`

const CrownIcon = styled.img`
    width: 16px;
    align-self: flex-start;
    margin-left: 15px;
    margin-right: 10px;
`

const CrownText = styled.p`
    margin: 0px;
    margin-top: 1px;
`

const ClearedDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-left: 40px;
    margin-right: 10px;
    font-family: taikoLight;
    margin-top: 10px;
`

const DiffDiv = styled.div`
    display: flex;
    width: 150px;
    height: 40px;
    position: relative;
    background: ${props => props.color || 'white'};
    &:before {
        content: "";
        position: absolute;
        right: -40px;
        bottom: 0;
        width: 0;
        height: 0;
        border-left: 40px solid ${props => props.color || 'white'};;
        border-top: 40px solid transparent;
    }
    border-top-left-radius: 5px;
    align-items: center;
    justify-content: center;
`

const DiffTitle = styled.p`
    font-size: 1em;
    font-family: taikoBold;
`

const DiffContent = styled.div`
    padding: 10px;
    background-color: #00000018;
    border-top-right-radius: 15px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    grid-gap: 10px;
    @media screen and (max-width: 500px) {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;
        flex:1;
    }
`

export default MainRankingContentComponent;