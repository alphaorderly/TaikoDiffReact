import React, { ReactNode } from 'react';
import styled from 'styled-components';
import background from '../../Assets/images/background.jpg'
import { useNavigate } from 'react-router-dom'

type Prop = {
    children: ReactNode
}

const DonderDataLayout: React.FC<Prop> = (props) => {

    const navigate = useNavigate();

    return (
        <MainDiv>
            <BackDiv onClick={() => navigate("/")}>메인으로 돌아가기</BackDiv>
            <p style={{fontFamily: 'taikoLight', fontSize: '10px', textAlign: 'center'}}>데이터를 가져오는데 시간이 걸립니다.<br/>클릭 후 기다려 주세요</p>
            <BackgroundDiv />
            {props.children}
        </MainDiv>
    )
}

const BackDiv = styled.div`
    font-family: taikoLight;
    color: white;
    background-color: black;
    padding: 5px;
    border-radius: 3px;
    margin-bottom: 10px;
    cursor: pointer;
`

const BackgroundDiv = styled.div`
    background-image: url(${background});
    background-repeat: repeat;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: -1000;
`

const MainDiv = styled.div`
    background-color: #FFFFFFCC;
    border-radius: 20px;
    padding: 30px;
    width: 50%;
    margin: auto;
    margin-top: 10vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 500px) {
        width: 80%;
    }
`

export default DonderDataLayout;