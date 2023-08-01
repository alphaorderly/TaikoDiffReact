import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainRankingHeaderComponent from './MainRankingHeaderComponent';
import { useRecoilState } from 'recoil';
import {  Ranks, clearedType, codeGeneration } from '../../States/Ranks';
import MainRankingContentComponent from './MainRankingContentComponent';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import User from '../../States/User';
import { child, get, ref, set } from 'firebase/database';
import { db } from '../../Backend/Firebase';
import HashLoader from 'react-spinners/HashLoader';
import { DifficultyList } from '../../Consts/Songs';

/**
 *  검색창, 헤더, 서열표
 */

const MainRankingComponent: React.FC = () => {

    const [rank, setRank] = useRecoilState(Ranks);

    const [currentLevel, setCurrentLevel] = useState<number>(10);

    const [user, setUser] = useRecoilState(User);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth,(loggedInUser)=>{ 
            if(loggedInUser && user.loggedIn === false)
            {
                setUser({loggedIn: true, name: loggedInUser.providerData[0].displayName, uid: loggedInUser.uid});
            }
            else if(!loggedInUser && user.loggedIn === true)
            {
                setUser({loggedIn: false, name: null, uid: null});
            }

            if(loggedInUser) {
                const uid = loggedInUser.uid;

                const dbRef = ref(db);

                get(child(dbRef, `/data/${uid}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const serverValue: clearedType[] = snapshot.val();
                        for(const clear of serverValue) {
                            setRank(
                                (prev) => {
                                    return prev.map(item => {
                                            if(codeGeneration(item) === clear.code) {
                                                return {...item, clear: clear.cleared}
                                            }
                                            return item;
                                        }
                                    )
                                }
                            )
                        }
                        setLoading(true);
                    } else {
                        set(ref(db, `/data/${uid}`), "");
                        setLoading(true);
                    }
                })
            }
            setLoading(true);
        });
    }, [])

    if(loading === false) {
        return (
            <MainDiv>
                <HashLoader
                    style={{margin: "auto"}}
                    size={30}
                    color={"#ff5f5f"}
                />
            </MainDiv>
        )
    }

    return (
        <MainDiv>
            <SearchBar placeholder='검색할 제목을 입력해 주세요' value={search} onChange={text => setSearch(text.target.value)}/>
            <MainRankingHeaderComponent level={currentLevel} />
            <ContentDiv id="captureDiv">
                {
                    DifficultyList[currentLevel].map((difficulty) => {
                        return <MainRankingContentComponent searchTag={search.toLowerCase()} difficulty={difficulty} level={currentLevel}/>
                    })
                }
            </ContentDiv>
        </MainDiv>
    )
}

const MainDiv = styled.div`
    width: 100%;
`

const SearchBar = styled.input`
    width: 98%;
    height: 30px;
    padding: 2px 1%;
    margin: 0px 0px 20px 0px;
    border-radius: 15px;
    resize: none;
    border: none;
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    vertical-align: middle;
    font-family: rocknroll taikoLight;
    font-size: 14px;
`

const ContentDiv = styled.div`
    
`

export default MainRankingComponent;