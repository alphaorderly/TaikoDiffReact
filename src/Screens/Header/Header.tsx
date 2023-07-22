import React from 'react';
import { useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Ranks } from '../../States/Ranks';
import { RestartAlt } from '@mui/icons-material';

const Header: React.FC = () => {

    const resetRanks = useResetRecoilState(Ranks);

    return (
        <MainDiv>
            <TitleText>
                태고의 달인 난이도 표
            </TitleText>
            <RestartAlt 
                style={{marginRight: "20px", fontSize: "40px", cursor: "pointer"}}
                onClick={resetRanks}
            />
        </MainDiv>
    )
}

export default Header;

const MainDiv = styled.div`
    margin: 0px 10px 30px 10px;
    background-color: #e5511f;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const TitleText = styled.p`
    font-family: taikoBold;
    padding: 3px 20px;
    font-size: 25px;
`