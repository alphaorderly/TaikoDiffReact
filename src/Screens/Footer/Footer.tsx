import * as React from 'react';
import styled from 'styled-components';
import CenterContent from '../../Layouts/CenterContent';

const Footer: React.FC = () => {
    return (
        <CenterContent>
            <MainDiv>
                <ContactText>Created by Alpha, Orderly</ContactText>
                <ContactText>All rights of taiko no tatsujin belong to bandai namco</ContactText>
                <ContactText>Contact : ilov1112@gmail.com</ContactText>
                <ContactText>Github : https://github.com/nexusbusim/TaikoDiffReact</ContactText>
                <ContactText>Contributed by hotsixman, Lagos</ContactText>
            </MainDiv>
        </CenterContent>
    )
}

export default Footer;

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`

const ContactText = styled.p`
    margin: 0px;
    padding: 5px 0px;
    font-family: taikoLight;
    font-size: 10px;
    color: #00000055
`