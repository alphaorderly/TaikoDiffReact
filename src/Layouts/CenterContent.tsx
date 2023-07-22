import React, { ReactNode } from 'react';
import styled from 'styled-components';

type Prop = {
    children: ReactNode,
}

const CenterContent: React.FC<Prop> =  (props) => {
    return (
        <MainDiv>
            {
                props.children
            }
        </MainDiv>
    )
}

const MainDiv = styled.div`
    width: 50%;
    margin: auto;
    @media screen and (max-width: 500px) {
        width: 90%;
    }
`;

export default CenterContent;