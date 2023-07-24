import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainRankingHeaderComponent from './MainRankingHeaderComponent';
import { useRecoilState } from 'recoil';
import { DifficultyList, Ranks, Song, clearedType, codeGeneration, defaultRank } from '../../States/Ranks';
import MainRankingContentComponent from './MainRankingContentComponent';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import User from '../../States/User';
import { child, get, ref, set } from 'firebase/database';
import { db } from '../../Backend/Firebase';
import HashLoader from 'react-spinners/HashLoader';

const MainRankingComponent: React.FC = () => {

    const [rank, setRank] = useRecoilState(Ranks);

    const [currentLevel, setCurrentLevel] = useState<number>(10);

    const [user, setUser] = useRecoilState(User);

    const [loading, setLoading] = useState(false);

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

                console.log(uid);

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
                        console.log("no data");
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
            <MainRankingHeaderComponent level={currentLevel} />
            <ContentDiv>
                {
                    DifficultyList[currentLevel].map((difficulty) => {
                        return <MainRankingContentComponent difficulty={difficulty} level={currentLevel}/>
                    })
                }
            </ContentDiv>
        </MainDiv>
    )
}

const MainDiv = styled.div`
    width: 100%;
`

const ContentDiv = styled.div`
    
`

export default MainRankingComponent;