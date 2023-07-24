import React from 'react';
import styled from 'styled-components';

type Prop = {
    level: number,
}

const MainRankingHeaderComponent: React.FC<Prop> = (props) => {
    return (
        <MainDiv>
            <Title>
                태고의 달인 ⭐{props.level} 난이도 표
            </Title>
            <Info>
                한국어 제목의 오른쪽 아이콘 클릭시 영상이 있을시에 한해 전량 영상으로 연결됩니다.
            </Info>
            <Info>
                현재 상태를 클릭시 미클리어, 클리어, 풀콤, 전량 순으로 바뀝니다.
            </Info>
            <Info>
                비 로그인시 클리어 상태는 저장되지 않습니다.
            </Info>
        </MainDiv>
    )
}

const MainDiv = styled.div`
    border-radius: 20px;
    padding: 5px 10px 10px 30px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: whitesmoke;
`

const Title = styled.p`
    font-family: taikoBold;
    font-size: 20px;
`

const Info = styled.p`
    font-family: taikoLight;
`

export default MainRankingHeaderComponent;