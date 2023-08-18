import React, { useState } from 'react';
import DonderDataLayout from '../../Components/DonderData/DonderDataLayout';
import styled from 'styled-components';
import axios, { AxiosError } from 'axios';
import { Ranks, clearedType, codeGeneration } from '../../States/Ranks';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ClearStatus } from '../../Consts/Songs';
import { getAuth } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { db } from '../../Backend/Firebase';
import User from '../../States/User';
import { useNavigate } from 'react-router-dom';


type CardData = {
    taikoNo: number, 
    nickname: string, 
    myDon: string | undefined,
}

type Clears = {
    clearData: ClearDataByDiff[],
    songNo: number
}

type ClearDataByDiff = {
    difficulty: 'easy' | 'normal' | 'hard' | 'ura' | 'oni',
    crown: 'none' | 'played' | 'silver' | 'gold' | 'donderfull',
    badge: 'rainbow' | 'purple' | 'pink' | 'gold' | 'silver' | 'bronze' | 'white' | 'none'
}

type ClearData = {
    songNo: number
    difficulty: 'easy' | 'normal' | 'hard' | 'ura' | 'oni',
    crown: 'none' | 'played' | 'silver' | 'gold' | 'donderfull',
    badge: 'rainbow' | 'purple' | 'pink' | 'gold' | 'silver' | 'bronze' | 'white' | 'none'
}

type Cards = {
    cards: CardData[]
}

function string2clear(clear: 'none' | 'played' | 'silver' | 'gold' | 'donderfull'): ClearStatus {
    switch(clear) {
        case 'silver': return ClearStatus.클리어;
        case 'gold': return ClearStatus.풀콤;
        case 'donderfull': return ClearStatus.전량;
        default: return ClearStatus.미클리어;
    }
}

const DonderData: React.FC = () => {
    const [screen, setScreen] = useState(0);

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    const [token, setToken] = useState("");

    const [cards, setCards] = useState<Cards>();

    const [ranks, setRanks] = useRecoilState(Ranks);

    const user = useRecoilValue(User);

    const navigate = useNavigate();

    if(screen === 0) {
        return (
            <DonderDataLayout>
                <Title>동더히로바 데이터를 가져옵니다.</Title>
                <Title>남코 이메일/비밀번호를 입력해 주세요</Title>
                <Form
                    onSubmit={async (e) => {
                        e.preventDefault();

                        try {
                            const response = await axios('https://api.taiko.monster/login',{
                                method: 'post',
                                data: {
                                    "email": email,
                                    "pw": pw,
                                },
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })

                            const cards = await axios('https://api.taiko.monster/getcards',{
                                method: 'post',
                                data: {
                                    token: response.data.token,
                                },
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            })

                            setToken(response.data.token);
                            setCards(cards.data);
                            setScreen(1);
                        } catch(err: any) {
                            alert(`로그인 중 에러가 발생했습니다. ${err.response?.data}`);
                        }
                    }}
                >
                    <LoginInput onChange={e => setEmail(e.target.value)} value={email} type='email' placeholder='이메일'/>
                    <LoginInput onChange={e => setPw(e.target.value)} value={pw} type='password' placeholder='비밀번호'/>
                    <LoginButton type='submit'>로그인</LoginButton>
                </Form>
            </DonderDataLayout>
        )
    }

    if(screen === 1) {
        return (
            <DonderDataLayout>
                <Title>아래 카드 목록중 하나를 선택해 주세요</Title>
                {
                    cards !== undefined
                    &&
                    cards.cards.map(
                        (item, index) => {
                            return (
                                <div style={
                                        {
                                            display:'flex', 
                                            flexDirection: 'row', 
                                            backgroundColor: '#f84828AA', 
                                            padding: '10px', 
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                        }
                                    }
                                    onClick={async () => {
                                        alert(`${item.nickname}에서 데이터를 가져옵니다.\n확인 클릭 후 기다려주세요`)
                                        try{
                                            await axios('https://api.taiko.monster/selectcard',{
                                                method: 'post',
                                                data: {
                                                    token: token,
                                                    index: index,
                                                },
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                }
                                            })

                                            const clears = await axios('https://api.taiko.monster/getcleardata',{
                                                method: 'post',
                                                data: {
                                                    token: token,
                                                },
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                }
                                            })

                                            const clearsData: Clears[] = clears.data;

                                            let clearsInfo: ClearData[] = [];

                                            // 오니/우라 난이도중 클리어 한 것들만 고르기
                                            clearsData.forEach(item => {
                                                item.clearData.forEach(
                                                    clear => {
                                                        if((clear.difficulty === 'oni' || clear.difficulty === 'ura') && clear.crown !== 'none' && clear.crown !== 'played') {
                                                            clearsInfo.push(
                                                                {
                                                                    ...clear,
                                                                    songNo: item.songNo,
                                                                }
                                                            )
                                                        }
                                                    }
                                                )
                                            });
                                            
                                            const newRank = ranks.map(
                                                item => {
                                                    for(const clear of clearsInfo) {
                                                        if(item.songNo === clear.songNo && ((item.ura && clear.difficulty === 'ura') || ((!item.ura && clear.difficulty === 'oni')))) {
                                                            return {
                                                                ...item,
                                                                clear: string2clear(clear.crown)
                                                            }
                                                        }
                                                    }
                                                    return item;
                                                }
                                            )

                                            const auth = getAuth();
                                            if(auth.currentUser) {
                                                let clearedData: clearedType[] = [];
                                                for(const song of newRank) {
                                                    clearedData.push({cleared: song.clear, code: codeGeneration(song)});
                                                }
                                                await set(ref(db, `/data/${user.uid}`), clearedData);
                                            }

                                            navigate("/");

                                        } catch(err) {
                                            alert("클리어 기록을 가져오는데 에러가 발생했습니다.")
                                        }
                                    }}
                                >
                                    <img src={item.myDon} style={{width: '64px'}}/>
                                    <p style={{fontFamily: 'rocknroll, taikoLight', marginLeft: '20px', marginRight: '10px'}}>{item.nickname}</p>
                                </div>
                            )
                        }
                    )
                }
            </DonderDataLayout>
        )
    }

    return(
        <DonderDataLayout>
            pp
        </DonderDataLayout>
    )
}

const Title = styled.p`
    margin: 10px 0px;
    font-family: taikoLight;
    font-size: 16px;
`

const LoginInput = styled.input`
    margin: 15px 0px;
    border: 1px solemail gray;
    padding: 5px;
    border-radius: 5px;
    align-self: stretch;
`

const LoginButton = styled.button`
    margin: 10px 0px;
    background-color: #f7492a44;
    border: 1px solemail gray;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default DonderData;