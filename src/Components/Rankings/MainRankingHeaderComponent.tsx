import React from 'react';
import styled from 'styled-components';
import { Genre, genreColor } from '../../Consts/Songs';
import html2canvas from 'html2canvas';
import { useRecoilValue } from 'recoil';
import { Ranks } from '../../States/Ranks';

type Prop = {
    level: number,
}

const MainRankingHeaderComponent: React.FC<Prop> = (props) => {

    const currentRank = useRecoilValue(Ranks);
    
    const onSaveAs = (uri: string, filename: string) => {
		var link = document.createElement('a');
		document.body.appendChild(link);
		link.href = uri;
		link.download = filename;
		link.click();
		document.body.removeChild(link);
	};

    const onCapture = () => {
		html2canvas(document.getElementById('captureDiv')!, {scale: 1.1}).then(canvas => {
			onSaveAs(canvas.toDataURL('image/png'), 'taiko-result.png')
		});
	};


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
            <ScreenshotDiv onClick={onCapture}>
                📷 스크린샷 찍기
            </ScreenshotDiv>
            <GenreInfoDiv>
                {
                    Object.keys(genreColor).map(
                        (item) => {
                            return <GenreInfo genre={genreColor[Number.parseInt(item)]}>{Genre[Number.parseInt(item)]}</GenreInfo>
                        }
                    )
                }
            </GenreInfoDiv>
        </MainDiv>
    )
}

const MainDiv = styled.div`
    border-radius: 20px;
    padding: 5px 10px 10px 30px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: whitesmoke;
`

const ScreenshotDiv = styled.div`
    display: inline-block;
    margin: 0px 0px 10px 10px;
    font-family: 'taikoLight';
    background-color: antiquewhite;
    padding: 5px;
    border-radius: 10px;
    cursor:pointer;
`

const Title = styled.p`
    font-family: taikoBold;
    font-size: 20px;
`

const Info = styled.p`
    font-family: taikoLight;
`

const GenreInfoDiv = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`

const GenreInfo = styled.div<{genre: string}>`
    background-color: ${props => props.genre || "white"};
    font-family: taikoLight;
    padding: 5px;
    margin: 10px 10px;
    border-radius: 10px;
`

export default MainRankingHeaderComponent;