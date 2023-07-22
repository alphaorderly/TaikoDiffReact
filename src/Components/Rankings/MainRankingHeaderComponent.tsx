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
                아래의 곡을 드래그/드랍해 난이도를 직접 조정할수 있습니다.
            </Info>
            <Info>
                개인차 / 풀콤보 난이도 또한 클릭을 통해 껐다 켤수 있습니다.
            </Info>
            <Info>
                한국어 제목의 오른쪽 아이콘 클릭시 영상이 있을시에 한해 전량 영상으로 연결됩니다.
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