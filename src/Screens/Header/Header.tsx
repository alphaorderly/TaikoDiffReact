import React, { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Login, Logout } from '@mui/icons-material';
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, db } from '../../Backend/Firebase';
import { Ranks, clearedType, codeGeneration } from '../../States/Ranks';
import User from '../../States/User';
import { child, ref, get, set } from 'firebase/database';
import { ClipLoader } from 'react-spinners';


const Header: React.FC = () => {

    const resetRank = useResetRecoilState(Ranks);
    const setRank = useSetRecoilState(Ranks);
    const [user, setUser] = useRecoilState(User);

    function handleGoogleLogin() {
        const provider = new GoogleAuthProvider(); // provider를 구글로 설정
        signInWithPopup(auth, provider) // popup을 이용한 signup
          .then((data) => {
            document.location.reload();
        })
          .catch((err) => {
            alert(`구글 로그인 도중 에러가 발생하였습니다!\n에러내용 : ${err.message}`);
        });
    }

    function handleGoogleLogOut() {
        const auth = getAuth();
        signOut(auth).then(() => {
            resetRank();
            document.location.reload();
        });
    }

    return (
        <MainDiv>
            <TitleText>
                태고의 달인 난이도 표
            </TitleText>
            {
                user.loggedIn
                ?
                <
                    IconDiv
                    onClick={handleGoogleLogOut}
                >
                    <Logout
                        style={{marginRight: "20px", fontSize: "40px"}}
                    />
                    <IconText>로그아웃</IconText>
                </IconDiv>
                :
                <
                    IconDiv
                    onClick={handleGoogleLogin}
                >
                    <Login 
                        style={{marginRight: "20px", fontSize: "40px"}}
                    />
                    <IconText>로그인</IconText>
                </IconDiv>
            }
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
    font-size: 1em;
`

const IconDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    cursor:pointer;
`

const IconText = styled.p`
    font-family: taikoLight;
    font-size: 0.8em;
`