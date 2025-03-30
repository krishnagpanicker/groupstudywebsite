import styled from 'styled-components';
import Date from '@/utils/Date';
import Time from '@/utils/Time';
import Event from '@/utils/Event';
import { useStateContext } from '@/context/StateContext';

const EventBlock = styled.div`
    flex-direction: column !important; 
    display: flex;
    font-family: "Geist",sans-serif;
    width: 400px;
    min-width: 400px;
    height: 200px;
    min-height: 200px;
    border: 1px solid #E4E0E1;
    border-radius: 10px;
    padding: 10px;
    transition: transform 0.3s ease; 
    &:hover {
        transform: scale(1.05);
    }
`
const Profile = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    font-size: 16px;
`;

const EventCourse = styled.h1`
    font-size: 40px;
    margin-bottom: 10px;
`
const EventText = styled.h1`
    font-size: 16px;
    font-weight: 300;
    margin-bottom: 10px;
`

export default function StudyEvent({ displayName, timeStart, timeEnd, date, course, location }){
    const { user } = useStateContext();

    return(
        <EventBlock>
            <EventCourse>
                {course}
            </EventCourse>
            <Profile>
                <img src="/images/default.png" height={20} width={20}></img>
                <EventText>{ displayName }</EventText>
            </Profile>
            <EventText>
                Time: {timeStart.toString()} to {timeEnd.toString()}
            </EventText>
            <EventText>
                Date: {date.toString()}
            </EventText>
            <EventText>
                Location: {location}
            </EventText>
        </EventBlock>
    )
}
