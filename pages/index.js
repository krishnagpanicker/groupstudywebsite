import NavBar from "@/components/Navbar";
import { styled } from "styled-components";
import { useStateContext } from "@/context/StateContext";
import { useState } from "react";
import StudyEvent from "@/components/StudyEvent"
import Time from "@/utils/Time"
import Date from "@/utils/Date"

const Body = styled.main`
    flex-direction: column !important; 
    display: flex;
    font-family: "Geist",sans-serif;
    align-items:flex-start;
    padding-left: 20px;
    padding-top: 30px;
    gap: 300px;
`;

export const ImgHContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 20px;
`

export const HContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
`;

export const Heading = styled.h1`
    font-size: 36px;
    font-weight: 300;
    padding-bottom: 5px; 
`;

export const Underline = styled.hr`
    width: 75px; 
    height: 3px; 
    background-color: #40A2E3; 
    border: none; 
    margin: 5px 0; 
`;

const ImgIcon = styled.img`
    width: 50px; 
    height: 50px; 
`;

export default function Homepage(){
    const { user } = useStateContext();
    let t1 = new Time(5,30,false);
    let t2 = new Time(6,30,false);
    let date = new Date(15,3,2025);
    return(
        <> 
        <NavBar> </NavBar>
        <Body> 
            <ImgHContainer>
                <ImgIcon src="/images/notbook.png" alt="Logo" />
                <HContainer> 
                    <Heading>Today's Events</Heading>
                    <Underline/>
                    <StudyEvent timeStart={t1} timeEnd={t2} date={date} course="CMPEN 270" location="Haller 107"></StudyEvent>
                </HContainer>   
            </ImgHContainer>
            <ImgHContainer>
                <ImgIcon src="/images/calender2.png" alt="Logo" />
                <HContainer> 
                    <Heading>Future Events</Heading>
                    <Underline/>
                </HContainer>   
            </ImgHContainer>    
        </Body>
        </>
    )
}