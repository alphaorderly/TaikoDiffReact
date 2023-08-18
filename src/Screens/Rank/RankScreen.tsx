import React from 'react';
import CenterContent from '../../Layouts/CenterContent';
import MainRankingComponent from '../../Components/Rankings/MainRankingComponent';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

/**
 * 서열표를 보여주는 화면입니다.
 * @returns 
 */
const RankScreen: React.FC = () => {
    return (
        <CenterContent>
            <Header />
            <MainRankingComponent />
            <Footer />
        </CenterContent>
    )
}

export default RankScreen;