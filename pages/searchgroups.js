import NavBar from "@/components/Navbar";
import { styled } from "styled-components";
import { Heading,Underline } from "/";
import { Body,FieldHeader,SelectorDiv,Spacer } from ".//myevents";
import React, { useState } from "react";

const MySearchBody = styled.main`
    flex-direction: column !important; 
    display: flex;
    font-family: "Geist",sans-serif;
    align-items:flex-start;
`

const ImgIcon = styled.img`
    margin-top: 2px;
    width: 125px; 
    height: 125px; 
`;

const ImgHContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`

const SearchBorder = styled.div`
    width: 0; 
    height: 100vh; 
    border-right: 2px solid black;
    margin-left: 50px;
`
const HContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
    margin-top: 50px;
`
const TextboxDiv = styled.div`
    flex-direction: column !important; 
    display: flex;
    margin-left: 50px;
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

const Selector = styled.select`
    width: 30%;
    text-align: center;
`

export default function SearchGroupsPage(){
    const [isOpen, setIsOpen] = useState(false);
    const [hour, setHour] = useState(12);
    const [minute, setMinute] = useState(0);
    const [AM, setAM] = useState("AM");

    return(
        <>
        <NavBar> </NavBar>
        <Body>
          <MySearchBody>
                <ImgHContainer>
                    <ImgIcon src="/images/searchstack.png" alt="Logo" />
                    <HContainer>
                        <Heading>Search Study Events</Heading>
                        <Underline/>
                    </HContainer>
                </ImgHContainer>
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
                                <Spacer>:</Spacer>
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
            </MySearchBody>
            
            <SearchBorder>

            </SearchBorder>
        </Body>
        </>
    )

}