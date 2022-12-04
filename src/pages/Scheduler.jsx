import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import AppbarSpace from '../reusable/AppbarSpace'
import { Scheduler as Calendar } from "@aldabil/react-scheduler";
import baseUrl from '../utils/baseUrl';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { userData } from '../redux/slicer/userSlice';
import DateSetter from '../components/scheduler/DateSetter';

const Scheduler = () => {
    const user = useSelector(userData);
    const [list, setlist] = useState([]);

    useEffect( () => {
        axios.post( `${baseUrl}/user/${user?.ref_id}`, { ismentor: user?.ismentor },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("fam-id")}`,
            },
            withCredentials: true,
        } )
        .then( res => {
            console.log(res.data);

            console.log("asdasd: ",)
            
            const filtered = res.data.mentee.map( i => (
                {
                    ...i,
                    mentee: i.mentee.filter( a => a._id.email === "agustinagapito09@gmail.com" )
                }
            ) )

            setlist(filtered.map( i => i.mentee.map( mentee => mentee.schedule.map( sched => {
                return {
                    event_id: sched._id._id,
                    title: i._id.email,
                    start: new Date(sched._id.from),
                    end: new Date(sched._id.to)
                }
            } ) ) ).flat())

        })
        .catch( err => {
            console.error("error: ", err);
        })
    }, []);

    return (
    <React.Fragment>
        <AppbarSpace />
        <Container sx={{ mt: 5 }} >
            <Calendar 
                // events={list.map( i => i.mentee.map( mentee => {
                //     return {
                //         event_id: i._id._id,
                //         title: i._id.email,
                //         start: new Date("2022-12-03T14:01"),
                //         end: new Date("2022-12-03T14:01"),
                //     }
                // } ) )}
                events={list.map( i => i).flat()}
                view='month'
                customEditor={ (scheduler) => <DateSetter event={scheduler} /> }
            />
        </Container>
    </React.Fragment>
    )
}

export const EVENTS = [
    {
      event_id: 1,
      title: "Event 1",
      start: new Date("2022-12-03T14:02"),
      end: new Date("2022-12-03T14:01"),
    //   disabled: true,
    //   admin_id: [1, 2, 3, 4]
    },
];
  

export default Scheduler