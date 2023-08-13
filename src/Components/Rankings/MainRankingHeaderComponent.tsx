import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ClearStatus, Genre, genreColor } from '../../Consts/Songs';
import html2canvas from 'html2canvas';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Ranks } from '../../States/Ranks';
import clear from '../../Assets/images/clear.png'
import fullCombo from '../../Assets/images/fc.png'
import donderful from '../../Assets/images/fp.png'
import { ChosenGenre } from '../../States/ChosenGenre';

type Prop = {
    level: number,
}


/**
 * 
 *  헤더
 * 
 */
const MainRankingHeaderComponent: React.FC<Prop> = (props) => {

    const currentRank = useRecoilValue(Ranks);

    const [chosenGenre, setChosenGenre] = useRecoilState(ChosenGenre);
    
    const onSaveAs = (uri: string, filename: string) => {
		var link = document.createElement('a');
		document.body.appendChild(link);
		link.href = uri;
		link.download = filename;
		link.click();
		document.body.removeChild(link);
	};

    const onCapture = () => {
        const captureDiv = document.getElementById('screenshot');
        if(captureDiv === null || captureDiv === undefined) {
            alert("캡처 실패!");
            return;
        }
        const name = prompt("스크린샷에 포함될 당신의 아이디를 적어주세요");
        captureDiv.style.display = 'block';
        
        const nameDiv = document.getElementById('screenshotName');
        if(nameDiv !== null || nameDiv !== undefined) {
            nameDiv!.innerHTML = `태고의 달인 ⭐${props.level} by ` + name;
        }

		html2canvas(captureDiv, {scale: 1.1}).then(canvas => {
			onSaveAs(canvas.toDataURL('image/png'), 'taiko-result.png')
            captureDiv.style.display = 'none';
		});
	};


    return (
        <Div>
            <MainDiv>
                <Title>
                    태고의 달인 ⭐{props.level} 난이도 표
                </Title>
                <Info>
                    한국어 제목의 오른쪽 아이콘 클릭시 유튜브로 연결됩니다.
                </Info>
                <Info>
                    현재 상태를 클릭시 미클리어, 클리어, 풀콤, 전량 순으로 바뀝니다.
                </Info>
                <Info>
                    비 로그인시 클리어 상태는 저장되지 않습니다.
                </Info>
                <Info>
                    장르를 클릭해 특정 장르만 확인할수 있습니다.
                </Info>
                <ScreenshotDiv onClick={onCapture}>
                    📷 스크린샷 찍기
                </ScreenshotDiv>
                <GenreInfoDiv>
                    {
                        Object.keys(genreColor).map(
                            (item) => {
                                return <GenreInfo isChosen={chosenGenre === Number.parseInt(item)} onClick={() => {
                                    if(chosenGenre === null || chosenGenre !== Number.parseInt(item)) {
                                        setChosenGenre(Number.parseInt(item))
                                    } else {
                                        setChosenGenre(null);
                                    }
                                }} genre={genreColor[Number.parseInt(item)]}>{Genre[Number.parseInt(item)]}</GenreInfo>
                            }
                        )
                    }
                </GenreInfoDiv>
            </MainDiv>
            <ClearDiv>
                <CrownText>⭐{props.level} 전체<br/>클리어 갯수</CrownText>
                <div style={{margin: "10px"}}/>
                <CrownIcon src={clear}/>
                <CrownText>{currentRank.filter(item => (item.clear === ClearStatus.클리어)).length}</CrownText>
                <CrownIcon src={fullCombo}/>
                <CrownText>{currentRank.filter(item => (item.clear === ClearStatus.풀콤)).length}</CrownText>
                <CrownIcon src={donderful}/>
                <CrownText>{currentRank.filter(item => (item.clear === ClearStatus.전량)).length}</CrownText>
            </ClearDiv>
        </Div>
    )
}

const Div = styled.div`
    
`


const MainDiv = styled.div`
    border-radius: 20px;
    padding: 5px 10px 10px 30px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: whitesmoke;
`

const ClearDiv = styled.div`
    display: flex;
    align-items: center;
    background-color: whitesmoke;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin: 15px 0px 0px 0px;
    padding: 5px 10px;
    border-radius: 10px;
`

const CrownText = styled.p`
    margin: 0px 10px;
    font-family: taikoBold;
    font-size: 1em;
    line-height: 1.2em;
`

const CrownIcon = styled.img`
    width: 16px;
    height: 16px;
    margin: 8px 0px 0px 0px;
    margin-bottom: 10px;
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

const GenreInfo = styled.div<{genre: string, isChosen: boolean}>`
    background-color: ${props => props.genre || "white"};
    font-family: taikoLight;
    padding: 5px;
    margin: 10px 10px;
    border-radius: 10px;
    cursor: pointer;
    border: ${props => props.isChosen ? "solid 3px black" : "solid 0px black"};
`

export default MainRankingHeaderComponent;