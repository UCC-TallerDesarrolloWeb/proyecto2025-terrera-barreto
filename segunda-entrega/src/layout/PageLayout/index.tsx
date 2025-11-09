import React, { type ReactNode } from "react";
import PageContainer from "@components/PageContainer";
import Header from "@components/Header";
import Footer from "@components/Footer";
import styled from "styled-components";

interface Props {
    children: ReactNode | ReactNode[];
}

const ContentContainer = styled.section`
    display: flex;
    width: 100%;
    max-width: 100vw;
    flex-direction: column;
    padding: 0 60px;
`;

const PageLayout: React.FC<Props> = ({ children }) => {
    return (
        <PageContainer>
            <Header/>
            <ContentContainer>
                {children}
            </ContentContainer>
            <Footer/>
        </PageContainer>
    )
}

export default PageLayout;