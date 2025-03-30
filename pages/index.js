import NavBar from "@/components/Navbar";
import { styled } from "styled-components";
import { useStateContext } from "@/context/StateContext";
import { useState, useEffect, useRef } from "react";
import { collection, addDoc, getDocs, query, orderBy, where, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { database } from '@/library/firebaseConfig';
import { useRouter } from 'next/router';
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

const JoinPopup = styled.div`
    background: white;
    width: 50%;
    height: 60%;
    max-width: 500px;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    position: fixed;
    margin: 100px auto;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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

const CourseHeading = styled.p`
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 10px;
`;

const CourseText = styled.p`
    margin-top: 10px;
    font-size: 20px;
    font-weight: 300;
`;

const JoinButton = styled.button`
    width: 100%;
    font-size: 20px;
    font-weight: 700;
    padding: 15px 0px;
    background-color: #0c0950;
    color: white;
    border: 0px solid black;
    border-radius: 30px;
    margin-top: auto;
    transition: background-color 0.5s ease;

    &:hover {
        background-color: #4D55CC;
    }
`;

const PopupStatus = styled.p`
    color: red;
    font-size: 25px;
    font-weight: 400;
    text-align: center;
    align-self: center;
    margin-top: auto;
`;

export default function Homepage(){
    const { user } = useStateContext();
    const overRef = useRef(null);
    const router = useRouter();
    const [popupContent, setPopupContent] = useState(null);
    const [joinAttempted, tryJoin] = useState(false);
    const [clickedEvent, clickEvent] = useState(null);
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
    
    function attemptJoin(event) {
        let updateUser = {
            id: user.id || "defaultID",
            email: user.email,
            displayName: user.displayName
        }
        tryJoin(true);
        let flag = false;
        let tempContent = <JoinButton onClick={() => updateField(event.id, updateUser)} type="button">Join Event</JoinButton>;
        if (event.user.mail == user.email) {
            console.log("L bru");
            tempContent = <PopupStatus>Unable to join your own event.</PopupStatus>
            flag = true;
        }
        if (event.members.length == 3) {
            console.log("too many man");
            tempContent = <PopupStatus>Event is full, unable to join.</PopupStatus>
            flag = true;
        }
        setPopupContent(tempContent);
        clickEvent(event);
        if (flag) {
            return;
        }
        const updateField = async (documentID, newUser) => {
            try {
                const docRef = doc(database, "events", documentID);
                await updateDoc(docRef, {
                    members: arrayUnion(newUser)
                });
                window.location.reload();
            }
            catch (error) {
                console.error("Error joining event: ", error.message);
            }
        };
        console.log("Tried join.");
    }

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
                            <StudyEvent onClick={() => attemptJoin(event)} key={event.id} displayName={event.user.displayName} timeStart={st} timeEnd={et} date={edate} course={event.course} location={event.location}></StudyEvent>
                            )
                        })}
                    </EventList>
                    
                </HContainer>
                {joinAttempted && (
                    <Overlay ref={overRef} onClick={() => tryJoin(!joinAttempted)}>
                        <JoinPopup>
                            <CourseHeading>{clickedEvent.course}</CourseHeading>
                            <CourseText>Creator: {clickedEvent.user.displayName}</CourseText>
                            <CourseText>Time: {clickedEvent.startTime.hour > 12 ? clickedEvent.startTime.hour - 12 : clickedEvent.startTime.hour}:{clickedEvent.startTime.minute < 10 ? "0" + clickedEvent.startTime.minute : clickedEvent.startTime.minute} {(clickedEvent.startTime.hour < 12 || clickedEvent.startTime.hour == 24) ? "AM" : "PM"} to {clickedEvent.endTime.hour > 12 ? clickedEvent.endTime.hour - 12 : clickedEvent.endTime.hour}:{clickedEvent.endTime.minute < 10 ? "0" + clickedEvent.endTime.minute : clickedEvent.endTime.minute} {(clickedEvent.endTime.hour < 12 || clickedEvent.endTime.hour == 24) ? "AM" : "PM"}</CourseText>
                            <CourseText>Date: {clickedEvent.date.month}/{clickedEvent.date.day}/{clickedEvent.date.year}</CourseText>
                            <CourseText>Location: {clickedEvent.location}</CourseText>
                            <CourseText>Description: {clickedEvent.description}</CourseText>
                            <CourseText>Members: {(clickedEvent.members.length == 0) ? "None" : clickedEvent.members.map(item => item.displayName).join(", ")}</CourseText>
                            {popupContent}
                        </JoinPopup>
                    </Overlay>
                )}    
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
                            <StudyEvent onClick={() => attemptJoin(event)} key={event.id} displayName={event.user.displayName} timeStart={st} timeEnd={et} date={edate} course={event.course} location={event.location}></StudyEvent>
                            )
                        })}
                    </EventList>
                </HContainer>
            </ImgHContainer>    
        </Body>
        </>
    )
}