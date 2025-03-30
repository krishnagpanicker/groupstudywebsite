import NavBar from "@/components/Navbar";
import { styled } from "styled-components";
import { useStateContext } from "@/context/StateContext";
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, orderBy, where } from 'firebase/firestore';
import { database } from '@/library/firebaseConfig';
import StudyEvent from "@/components/StudyEvent"
import Time from "@/utils/Time"
import CustomDate from "@/utils/CustomDate"

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
    const [events, setEvents] = useState([]);
    const [futureEvents, setFutureEvents] = useState([]);
    const getFutureEvents = async () => {
        const currentDate = new Date();
        const currDateComb = (currentDate.getFullYear() * 10000) + ((currentDate.getMonth()+1) * 100) + currentDate.getDate();
        console.log(currDateComb);
        const x = query(
            collection(database, "events"),
            where("date.dateCombined", ">", currDateComb),
            orderBy("date.year", "asc"),
            orderBy("date.month", "asc"),
            orderBy("date.day", "asc"),
            orderBy("startTime.hour", "asc"),
            orderBy("startTime.minute", "asc")
        );
        try {
            const querySnap = await getDocs(x);
            let eventTemp = [];
            querySnap.forEach(doc => {
                console.log(doc.id, doc.data());
                eventTemp.push({ id: doc.id, ...doc.data() });
            });
            console.log("Temp events: ", eventTemp);
            setFutureEvents(eventTemp);
            console.log("Added events: ", futureEvents);
        }
        catch (error) {
            console.error("Error retrieving data: ", error.message);
        }
    };

    const getSortedEvents = async () => {
        const currentDate = new Date();
        const q = query(
            collection(database, "events"),
            where("date.year", "==", currentDate.getFullYear()),
            where("date.month", "==", currentDate.getMonth() + 1),
            where("date.day", "==", currentDate.getDate()),
            orderBy("startTime.hour", "asc"),
            orderBy("startTime.minute", "asc")
        );
        try {
            const querySnap = await getDocs(q);
            let eventTemp = [];
            querySnap.forEach(doc => {
                console.log(doc.id, doc.data());
                eventTemp.push({ id: doc.id, ...doc.data() });
            });
            console.log("Temp events: ", eventTemp);
            setEvents(eventTemp);
            console.log("Added events: ", events);
        }
        catch (error) {
            console.error("Error retrieving data: ", error.message);
        }
    };
    useEffect(() => {
        if (!user || !user.email) {
            console.log("bro dont exist");
            return;
        }
        getSortedEvents();
        getFutureEvents();
    }, [user]);
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
                        {events.map((event) => {
                            let hour_st = event.startTime.hour > 12 ? event.startTime.hour - 12 : event.startTime.hour;
                            let am_est = event.startTime.hour < 12 || event.startTime.hour == 24;
                            let st = new Time(hour_st, event.startTime.minute, am_est);
        
                            let hour_et = event.endTime.hour > 12 ? event.endTime.hour - 12 : event.endTime.hour;
                            let am_eet = event.endTime.hour < 12 || event.endTime.hour == 24;
                            let et = new Time(hour_et, event.endTime.minute, am_eet);
        
                            let edate = new CustomDate(event.date.day, event.date.month, event.date.year);
                            return(
                            <StudyEvent key={event.id} displayName={event.user.displayName} timeStart={st} timeEnd={et} date={edate} course={event.course} location={event.location}></StudyEvent>
                            )
                        })}
                    </EventList>
                </HContainer>   
            </ImgHContainer>
            <ImgHContainer>
                <ImgIcon src="/images/calender2.png" alt="Logo" />
                <HContainer> 
                    <Heading>Future Events</Heading>
                    <Underline/>
                    <EventList>
                        {futureEvents.map((event) => {
                            let hour_st = event.startTime.hour > 12 ? event.startTime.hour - 12 : event.startTime.hour;
                            let am_est = event.startTime.hour < 12 || event.startTime.hour == 24;
                            let st = new Time(hour_st, event.startTime.minute, am_est);
        
                            let hour_et = event.endTime.hour > 12 ? event.endTime.hour - 12 : event.endTime.hour;
                            let am_eet = event.endTime.hour < 12 || event.endTime.hour == 24;
                            let et = new Time(hour_et, event.endTime.minute, am_eet);
        
                            let edate = new CustomDate(event.date.day, event.date.month, event.date.year);
                            return(
                            <StudyEvent key={event.id} displayName={event.user.displayName} timeStart={st} timeEnd={et} date={edate} course={event.course} location={event.location}></StudyEvent>
                            )
                        })}
                    </EventList>
                </HContainer>
            </ImgHContainer>    
        </Body>
        </>
    )
}