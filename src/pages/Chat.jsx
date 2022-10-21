import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import AppbarSpace from "../reusable/AppbarSpace";
import io from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import { userData } from "../redux/slicer/userSlice";
import baseUrl from "../utils/baseUrl";

// const url = "https://senhai-connect-server-test.onrender.com/";
const url = "http://localhost:5000/";

const Chat = () => {
    // const socket = useRef( io(url, { transports: ['websocket', 'polling'], path: "/chat" }) ).current;
    // const user = useSelector(userData);

    // const [online, setOnline] = useState(0)

    // useEffect( () => {
    //     socket.on("connect", () => {
    //         console.log(socket);
    //     })
    // }, [])

    // useEffect( () => {
    //     socket.emit("join_room", { room: "irish", user: window.location.pathname.split("/")[2] })
    //     const source = axios.CancelToken.source();

    //     const getUserData = async () => {
    //         try {
    //             const user_profile = await axios.post( `${baseUrl}/user/${user?.ref_id}`, { ismentor: user?.ismentor },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem("fam-id")}`,
    //                 },
    //                 withCredentials: true,
    //                 cancelToken: source.token
    //             } )

    //             console.log("user profile: ", user_profile)

    //         } catch (error) {
    //             console.error(error)
    //         }
    //     }

    //     getUserData();
        
    //     return () => {
    //         source.cancel();
    //     }
    // }, []);

    // useEffect( () => {
    //     socket.on("joined_room", data => {
    //         console.log("socket: ",data);
    //         setOnline(data.users.length)
    //     })

    // }, [socket])


    return (
        <React.Fragment>
            <AppbarSpace divider />

            <Container sx={{ mt: 4 }}>
                <Stack direction="row" gap={3}>
                    <Typography variant="h3">Chats</Typography>
                    <Divider orientation="vertical" flexItem />
                </Stack>
            </Container>
        </React.Fragment>
    );
};

export default Chat;
