import React, { useState, useRef } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Close, Login, Logout } from '@mui/icons-material';
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, db } from '../../Backend/Firebase';
import { Ranks, clearedType, codeGeneration } from '../../States/Ranks';
import User from '../../States/User';
import { DonderToken } from '../../States/DonderToken';
import Modal from 'react-modal';

const modalStyles: Modal.Styles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
        height: '100%',
        width: '100%',
        position: 'fixed',
    }
};

const Header: React.FC = () => {

    const resetRank = useResetRecoilState(Ranks);
    const setRank = useSetRecoilState(Ranks);
    const [user, setUser] = useRecoilState(User);
    const [donderToken, setDonderToken] = useRecoilState(DonderToken)
    const [herobaModal, setHerobaModal] = useState(false);

    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);

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
            <LoginDiv>
                {
                    user.loggedIn
                    ?
                    <
                        IconDiv
                        onClick={handleGoogleLogOut}
                    >
                        <Logout
                            style={{fontSize: "24px", alignSelf: "center"}}
                        />
                        <IconText>구글 로그아웃</IconText>
                    </IconDiv>
                    :
                    <
                        IconDiv
                        onClick={handleGoogleLogin}
                    >
                        <Login 
                            style={{fontSize: "24px", alignSelf: "center"}}
                        />
                        <IconText>구글 로그인</IconText>
                    </IconDiv>
                }
            </LoginDiv>
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    margin-top: 10px;
    cursor:pointer;
`

const IconText = styled.p`
    font-family: taikoLight;
    align-self: center;
    font-size: 0.7em;
`

const LoginDiv = styled.div`
    display: flex;
`

const DonderLoginDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const DonderLoginInput = styled.input`
    border: 1px solid black;
    font-size: 16px;
    height: 22px;
    padding: 3px;
    border-radius: 5px;
`

const DonderLoginText = styled.p`
    margin-right: 20px;
    font-family: taikoLight;
`

const DonderLoginButton = styled.button`
    
`