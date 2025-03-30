import NavBar from "@/components/Navbar";
import { styled } from "styled-components";
import { Heading,Underline } from "/";
import { Body,FieldHeader,SelectorDiv,Spacer } from ".//myevents";
import React, { useState, useEffect, useRef } from "react";
import { useStateContext } from "@/context/StateContext";

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
    margin: 10px auto;
    width: 80%;
    
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
    const { user } = useStateContext();
    const [isOpen, setIsOpen] = useState(false);
    const [courseCode, setCourse] = useState("");
    const [located, setLocation] = useState("");
    const [described, setDescription] = useState("");
    const [selectedHour1, setHour1] = useState(12);
    const [selectedMinute1, setMinute1] = useState(0);
    const [AM1, setAM1] = useState("AM");
    const [selectedHour2, setHour2] = useState(12);
    const [selectedMinute2, setMinute2] = useState(0);
    const [AM2, setAM2] = useState("AM");

    const [selectedMonth, setMonth] = useState(1);
    const [selectedYear, setYear] = useState(2025);
    const [selectedDay, setDay] = useState(1);
    const [daysInMonth, setDaysInMonth] = useState([]);

    useEffect(() => {
        let numDays = 0;
        let isLeapYear = selectedYear % 4 == 0;
        if (selectedMonth == 1 || selectedMonth == 3 || selectedMonth == 5 || selectedMonth == 7 || selectedMonth == 8 || selectedMonth == 10 || selectedMonth == 12) {
            numDays = 31;
        }
        else if (selectedMonth == 4 || selectedMonth == 6 || selectedMonth == 9 || selectedMonth == 11) {
            numDays = 30;
        }
        else {
            numDays = isLeapYear ? 29 : 28;
        }
        let days = [];
        for (let i = 1; i <= numDays; i++) {
            days.push(i);
        }
        setDaysInMonth(days);
    }, [selectedMonth, selectedYear]);

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
                                <Selector id="hour1" value={selectedHour1} onChange={(e) => setHour1(e.target.value)}> 
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
                                <Selector id="minute1" value={selectedMinute1} onChange={(e) => setMinute1(e.target.value)}> 
                                    <option value={0}>00</option>
                                    <option value={15}>15</option>
                                    <option value={30}>30</option>
                                    <option value={45}>45</option>
                                </Selector>
                                <Selector id="AM_PM1" value={AM1} onChange={(e) => setAM1(e.target.value)}> 
                                    <option value={"AM"}>AM</option>
                                    <option value={"PM"}>PM</option>
                                </Selector>
                                <Spacer>to</Spacer>
                                <Selector id="hour2" value={selectedHour2} onChange={(e) => setHour2(e.target.value)}> 
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
                                <Selector id="minute2" value={selectedMinute2} onChange={(e) => setMinute2(e.target.value)}> 
                                    <option value={0}>00</option>
                                    <option value={15}>15</option>
                                    <option value={30}>30</option>
                                    <option value={45}>45</option>
                                </Selector>
                                <Selector id="AM_PM2" value={AM2} onChange={(e) => setAM2(e.target.value)}> 
                                    <option value={"AM"}>AM</option>
                                    <option value={"PM"}>PM</option>
                                </Selector>
                            </SelectorDiv>
                            <FieldHeader>Date</FieldHeader>
                            <SelectorDiv>
                                <Selector id="month" value={selectedMonth} onChange={(e) => setMonth(e.target.value)}>
                                    <option value={1}>January</option>
                                    <option value={2}>February</option>
                                    <option value={3}>March</option>
                                    <option value={4}>April</option>
                                    <option value={5}>May</option>
                                    <option value={6}>June</option>
                                    <option value={7}>July</option>
                                    <option value={8}>August</option>
                                    <option value={9}>September</option>
                                    <option value={10}>October</option>
                                    <option value={11}>November</option>
                                    <option value={12}>December</option>
                                </Selector>
                                <Spacer>/</Spacer>
                                <Selector id="day" value={selectedDay} onChange={(e) => setDay(e.target.value)}>
                                    {daysInMonth.map((day) => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </Selector>
                                <Spacer>/</Spacer>
                                <Selector id="year" value={selectedYear} onChange={(e) => setYear(e.target.value)}>
                                    <option value={2025}>2025</option>
                                    <option value={2026}>2026</option>
                                    <option value={2027}>2027</option>
                                    <option value={2028}>2028</option>
                                    <option value={2029}>2029</option>
                                </Selector>
                            </SelectorDiv>
                            <FieldHeader>Location</FieldHeader>
                            <InputTextbox type="text" placeholder="e.g. Haller 107" onChange={(e) => setLocation(e.target.value)}></InputTextbox>
                </TextboxDiv>
            </MySearchBody>
            
            <SearchBorder>

            </SearchBorder>
        </Body>
        </>
    )

}