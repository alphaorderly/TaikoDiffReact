import React, { useState } from 'react';
import styled from 'styled-components';
import MainRankingHeaderComponent from './MainRankingHeaderComponent';
import { useRecoilValue } from 'recoil';
import { Ranks } from '../../States/Ranks';
import MainRankingContentComponent from './MainRankingContentComponent';

const MainRankingComponent: React.FC = () => {

    const currentRank = useRecoilValue(Ranks);
    const [currentLevel, setCurrentLevel] = useState<number>(10);

    return (
        <MainDiv>
            <MainRankingHeaderComponent level={currentLevel} />
            <ContentDiv>
                {
                    Object.keys(currentRank[currentLevel].rank).map((key, index) => {
                        return (
                            <MainRankingContentComponent level={currentLevel} difficulty={key} />
                        )
                    })
                }
            </ContentDiv>
        </MainDiv>
    )
}

const MainDiv = styled.div`
    width: 100%;
`

const ContentDiv = styled.div`
    
`

export default MainRankingComponent;