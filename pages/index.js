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
    padding: 30px;
    gap: 50px;
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
    width: 100%;
`;

export const Heading = styled.h1`
    font-size: 36px;
    font-weight: 300;
    padding-bottom: 5px; 
`;

const WebsiteName = styled.h1`
    font-size: 36px;
    font-weight: 300;
    color: white;
    padding-bottom: 5px;
`

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

const EventList = styled.div`
    padding: 20px;
    max-width: 80vw;
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    gap: 20px;
`;

export default function Homepage(){
    const { user } = useStateContext();
    let t1 = new Time(5,30,false);
    let t2 = new Time(6,30,false);
    let date = new Date(15,3,2025);

    let t3 = new Time(4, 0, false);
    let t4 = new Time(6, 0, false);
    let date2 = new Date(16, 3, 2025);

    let t5 = new Time(11, 15, true);
    let t6 = new Time(12, 45, false);
    let date3 = new Date(20, 3, 2025);

    let t7 = new Time(3, 30, false);
    let t8 = new Time(6, 30, false);
    let date4 = new Date(22, 3, 2025);

    return(
        <> 
        <NavBar> </NavBar>
        <Body> 
            <ImgHContainer>
                <ImgIcon src="/images/notbook.png" alt="Logo" />
                <HContainer> 
                    <Heading>Today's Events</Heading>
                    <Underline/>
                    <EventList>
                        <StudyEvent timeStart={t1} timeEnd={t2} date={date} course="CMPEN 270" location="Haller 107"></StudyEvent>
                        <StudyEvent timeStart={t3} timeEnd={t4} date={date2} course="MATH 141" location="McElwain Round Table"></StudyEvent>
                        <StudyEvent timeStart={t5} timeEnd={t6} date={date3} course="PHIL 120N" location="Lyons Conference Room"></StudyEvent>
                        <StudyEvent timeStart={t5} timeEnd={t6} date={date3} course="PHIL 120N" location="Lyons Conference Room"></StudyEvent>
                    </EventList>
                </HContainer>   
            </ImgHContainer>
            <ImgHContainer>
                <ImgIcon src="/images/calender2.png" alt="Logo" />
                <HContainer> 
                    <Heading>Future Events</Heading>
                    <Underline/>
                    <EventList>
                        <StudyEvent timeStart={t1} timeEnd={t2} date={date} course="CMPEN 270" location="Haller 107"></StudyEvent>
                        <StudyEvent timeStart={t3} timeEnd={t4} date={date2} course="MATH 141" location="McElwain Round Table"></StudyEvent>
                        <StudyEvent timeStart={t5} timeEnd={t6} date={date3} course="PHIL 120N" location="Lyons Conference Room"></StudyEvent>
                        <StudyEvent timeStart={t5} timeEnd={t6} date={date3} course="PHIL 120N" location="Lyons Conference Room"></StudyEvent>
                    </EventList>
                </HContainer>   
            </ImgHContainer>    
        </Body>
        </>
    )
}