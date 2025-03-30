import NavBar from "@/components/Navbar";
import { styled } from "styled-components";
import { HContainer,Heading,Underline,ImgHContainer } from "/";
import React, { useState } from "react";


const Body = styled.main`
    flex-direction: row !important; 
    display: flex;
    font-family: "Geist",sans-serif;
    align-items:flex-start;
`

const MyEventBody = styled.main`
    flex-direction: column !important; 
    display: flex;
    font-family: "Geist",sans-serif;
    align-items:flex-start;
    padding-left: 20px;
    padding-top: 30px;
`
const EventBorder = styled.div`
    width: 0; 
    height: 100vh; 
    border-right: 2px solid black;
    margin-left: 200px;
`

const NewEvent = styled.button`
    position: absolute;
    bottom: 30px;
    right: 30px;
    width: 75px;
    height: 75px;
    font-size: 25px;
    font-weight: 600;
    padding: 10px;
    border: 0px;
    border-radius: 50%;
    background-color: #0c0950;
    color: white;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }
`;

const CreateEventDiv = styled.div`
    dipslay: flex;
    flex-direction: row;
    justify-content: center;
`
export const ImgIcon = styled.img`
    margin-top: 2px;
    width: 50px; 
    height: 50px; 
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); // Semi-transparent background
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background: white;
  width: 50%;
  height: 70vh;
  max-width: 500px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1001;
`;

const TextboxDiv = styled.div`
    flex-direction: column !important; 
    display: flex;
`

const PopUpHeader = styled.h1`
    text-align: center;
`

const InputTextbox = styled.input`
    margin: 5px auto;
    border: 1px solid #E4E0E1;
    border-radius: 3px;
    height: 24px;
    font-size: 15px;
    padding: 2px;
    width: 100%;
    margin-bottom: 15px;
`;

const SelectorDiv = styled.div`
    flex-direction: row !important; 
    display: flex;
    gap: 10px;
    margin-top: 5px;
`

const Selector = styled.select`
    width: 10%;
    text-align: center;
`
const Spacer = styled.h1`
    font-size: 15px;
`

const FieldHeader = styled.h1`
    margin-top: 20px;
    align-self: flex-start;
    font-weight: 300;
    font-size: 15px;
`;

export default function MyEventsPage(){
    const [isOpen, setIsOpen] = useState(false);
    const [hour, setHour] = useState(12);
    const [minute, setMinute] = useState(0);
    const [AM, setAM] = useState("AM");

    return(
    <>
    <NavBar> </NavBar>
    <Body>
        <MyEventBody>
            <ImgHContainer>
                <ImgIcon src="/images/MyEventLogo.png" alt="Logo" />
                <HContainer>
                    <Heading>My Events</Heading>
                    <Underline/>
                </HContainer>
            </ImgHContainer>
        </MyEventBody>
        <CreateEventDiv>
            <NewEvent onClick={() => setIsOpen(true)}>
                <ImgIcon src="/images/plus--v2.png" alt="Logo" />
            </NewEvent>
            {isOpen && (
                <Overlay onClick={() => setIsOpen(false)}>
                    <PopupContainer onClick={(e) => e.stopPropagation()}> 
                        <PopUpHeader>Create A New Event</PopUpHeader>
                        <hr style={{ border: "1px solid #E4E0E1", width: "100%", margin: "10px 0px 10px 0px" }}/>
                        <TextboxDiv>
                            <FieldHeader>Course Name</FieldHeader>
                            <InputTextbox type="text" placeholder="e.g. CMPEN 270"></InputTextbox>
                            <FieldHeader>Time</FieldHeader>
                            <SelectorDiv>
                                <Selector id="hour" value={hour} onChange={(e) => setHour(e.target.value)}> 
                                    <option value={12}>12</option>
                                    <option value={1}>01</option>
                                    <option value={2}>02</option>
                                    <option value={3}>03</option>
                                    <option value={4}>04</option>
                                    <option value={5}>05</option>
                                    <option value={6}>06</option>
                                    <option value={7}>07</option>
                                    <option value={8}>08</option>
                                    <option value={9}>09</option>
                                    <option value={10}>10</option>
                                    <option value={11}>11</option>
                                </Selector>
                                <Colon>:</Colon>
                                <Selector id="minute" value={minute} onChange={(e) => setMinute(e.target.value)}> 
                                    <option value={0}>00</option>
                                    <option value={15}>15</option>
                                    <option value={30}>30</option>
                                    <option value={45}>45</option>
                                </Selector>
                                <Selector id="AM_PM" value={AM} onChange={(e) => setAM(e.target.value)}> 
                                    <option value={"AM"}>AM</option>
                                    <option value={"PM"}>PM</option>
                                </Selector>
                            </SelectorDiv>
                            
                        </TextboxDiv>
                    </PopupContainer>
                </Overlay>
            )}
        </CreateEventDiv>
        <EventBorder>
            
        </EventBorder>
    </Body>
    </>
    )
}