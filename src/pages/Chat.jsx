import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarGroup, Box, Container, Divider, IconButton, ListItem as MuiListItem, Stack, TextField, Typography } from "@mui/material";
import AppbarSpace from "../reusable/AppbarSpace";
import io from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import { userData } from "../redux/slicer/userSlice";
import baseUrl from "../utils/baseUrl";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import WhiteText from "../reusable/WhiteText";
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';
import { useLocation } from "react-router-dom";
import { withStyles } from "@mui/styles";

// const url = "https://senhai-connect-server-test.onrender.com/";
const url = "http://localhost:5001/";

const Chat = () => {
    const ref = useRef(null);
    const socket = useRef( io(url, { transports: ['websocket', 'polling'], path: "/chat" }) ).current;
    const user = useSelector(userData);

    const [online, setOnline] = useState(0);
    const [msg, setMsg] = useState('');
    const [msgList, setMsgList] = useState([]);
    const [menteeList, setMenteeList] = useState([]);
    const [userList, setUserList] = useState({});
    const [sendToRefID, setSendToRefID] = useState("");
    
    const location = useLocation();

    // const sendToRefID = location.pathname.split("/")[4];

    useEffect( () => {
        socket.on("connect", () => {
            console.log(socket);
        })

    }, [])

    useEffect( () => {

        if(sendToRefID !== "") {
            socket.emit("join_room", { room_id: sendToRefID, user: user?.firstname })
        }

    }, [sendToRefID, socket])

    
    const fetchProfile = async (source) => {
        console.log("fetching profile....")
        try {
            const user_profile = await axios.post( `${baseUrl}/user/${user?.ref_id}`, { ismentor: user?.ismentor },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("fam-id")}`,
                },
                withCredentials: true,
                cancelToken: source.token
            } )
            
            if( user_profile.data.ismentor ) {
                // console.log("user: ", user_profile.data.mentor.mentee.map( i => i._id ).map( i => ({...i})) );

                setMenteeList([user_profile.data.mentor]);
                setSendToRefID("Group "+user_profile.data.mentor._id.firstname)
    
                if(sendToRefID !== "group") {
                    setUserList( user_profile.data.mentor.mentee.map( i => i._id).filter( a => a.ref_id === sendToRefID)[0] );
                }
    
            } else {
                // console.log(user_profile.data)
                setMenteeList(user_profile.data.mentee);
                setSendToRefID("Group "+user_profile.data.mentee[0]._id.firstname)
            }
           
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( () => {
        const source = axios.CancelToken.source();

        fetchProfile(source);
        
        return () => source.cancel("Fetch Profile Cancelled...")
    }, [user])

    useEffect( () => {
        socket.on("joined_room", data => {

            // setOnline(data.users.length)
            if (data.doc !== null) {
                if(data.doc.room_id === sendToRefID ) {
                    console.log("socket: ",sendToRefID, data);

                    setMsgList(data.doc.messages);
                    ref.current.scrollTo({
                        top: ref.current.scrollHeight,
                        behavior: 'smooth',
                    })
                } 
            } else {
                setMsgList([]);
            }

        })
    }, [sendToRefID, socket])
    // console.log("mentee: ",menteeList.map( i => i))

    useEffect( () =>  {
        socket.on("messages", data => {
            if(data.room_id === sendToRefID) {
                console.log("messages: ", data)

                setMsgList(data.messages);
                ref.current.scrollTo({
                    top: ref.current.scrollHeight,
                    behavior: 'smooth',
                })

            }
        })
    }, [sendToRefID, socket])

    const handleSubmit = e => {
        e.preventDefault();

        if(msg.trim().length !== 0 ) {
            socket.emit("send_message", { room_id: sendToRefID, msg: msg, sender: user?.firstname, img: user?.img })
            // setMsgList( prev => [...prev,msg] )
            setMsg("")
        }
      
    }

    return (
        <React.Fragment>
            <AppbarSpace divider />
            <Stack direction="row" justifyContent="start" width="100%" >
                <Box bgcolor="#0c0147" height='calc(100vh - 65px)' >
                    <Box width={{ sm: "100%", md: "360px"}} p={2} >
                        <Typography color="white" variant="h4">Chats</Typography>

                        <Members 
                            list={menteeList} 
                            sendToRefID={sendToRefID} 
                            setSendToRefID={setSendToRefID} 
                            setUserList={setUserList} 
                            user={user}
                        />
                    </Box>
                </Box>

                <Stack width="100%" position="relative" height='calc(100vh - 65px)' >
                    <Box m={2} >
                        <Typography variant="h5" >
                            <Typography component="span" variant="h5" textTransform="capitalize" >{sendToRefID} </Typography>
                            's Room
                        </Typography>
                    </Box>

                    <Divider  />

                    <Box 
                        ref={ref}
                        width="100%" 
                        p={2} 
                        overflow="auto" 
                        height="100%"
                        alignSelf="end"
                    >   
                        {msgList?.map( i => (
                            <ChatMsg 
                                key={i._id}
                                avatar={i.img}
                                side={ user?.firstname !== i.sender ? "left" : "right" }
                                messages={[i.message]}
                            />
                        ))}
                        
                    </Box>

                    <Stack
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            width: "100%"
                        }}
                        direction="row"
                        alignItems="center"
                        gap={2}
                        p={2}
                    >

                        <TextField
                            placeholder="Aa"
                            size="small"
                            type="text"
                            name="message"
                            autoComplete="off"
                            fullWidth
                            value={msg}
                            onChange={ e => setMsg(e.target.value) }
                            // multiline
                            // maxRows={3}
                            InputProps={{
                                sx: {
                                    borderRadius: 5,
                                    bgcolor: "grey.200",
                                    border: "none"
                                }
                            }}
                        />

                        <IconButton size="large" type="submit" >
                            <SendRoundedIcon fontSize="inherit" color="primary" />
                        </IconButton>
                    </Stack>

                </Stack>
            </Stack>
        </React.Fragment>
    );
};

const Members = ({ list, sendToRefID, setSendToRefID, setUserList, user }) => {
    // console.log("list: ",list);

    return (
        <React.Fragment>
            <Stack gap={2} mt={4} >
                {list.map( mentor => ( 
                    <React.Fragment key={mentor._id._id}>
                        <ListItem 
                            selected 
                            disableGutters sx={{ borderRadius: 3, p: 1 }} 
                            onClick={ () => setSendToRefID("Group "+mentor._id.firstname) }
                        >
                            <Stack direction="row" gap={1} >
                                <AvatarGroup  max={3} total={mentor.mentee.length+1} >
                                    <Avatar src={mentor._id.img} sx={{ width: 50, height: 50 }} />
                                    {mentor.mentee.map( mentee => (
                                        <Avatar src={mentee._id.img} key={mentee._id._id} sx={{ width: 50, height: 50 }} />
                                    ) )}
                                </AvatarGroup>

                                <WhiteText textTransform="capitalize" variant="h6" >Group</WhiteText>
                            </Stack>
                        </ListItem>

                        {!user?.ismentor && 
                            <ListItem
                                key={mentor._id._id} 
                                disableGutters sx={{ borderRadius: 3, p: 1 }} 
                                onClick={ () => {
                                    setSendToRefID(mentor._id.ref_id+user?.ref_id);
                                    // setUserList( list.map( i => i._id).filter( a => a.ref_id === sendToRefID)[0] );
                                } }
                            >
                                <Stack direction="row" gap={1}  >
                                    <Avatar src={mentor._id.img} sx={{ width: 50, height: 50 }}  />
                                    <WhiteText textTransform="capitalize" variant="h6" >{mentor._id.firstname} {mentor._id.lastname}</WhiteText>
                                    
                                </Stack>
                            </ListItem>
                        }

                        {mentor.mentee.map( mentee => mentee._id.ref_id !== user?.ref_id && (
                            <ListItem 
                                key={mentee._id._id} 
                                disableGutters sx={{ borderRadius: 3, p: 1 }} 
                                onClick={ () => {
                                    setSendToRefID(user?.ref_id+mentee._id.ref_id);
                                    // setUserList( list.map( i => i._id).filter( a => a.ref_id === sendToRefID)[0] );
                                } }
                            >
                                <Stack direction="row" gap={1}  >
                                    <Avatar src={mentee._id.img} sx={{ width: 50, height: 50 }}  />
                                    <WhiteText textTransform="capitalize" variant="h6" >{mentee._id.firstname} {mentee._id.lastname}</WhiteText>
                                    
                                </Stack>
                            </ListItem>
                        ))}
                    </React.Fragment>
                ) )}

            </Stack>
        </React.Fragment>
    )
}

const ListItem = withStyles({
    root: {
      "&$selected": {
        backgroundColor: "rgba(255,255,255, 0.3)",
        // color: "white",
        // "& .MuiListItemIcon-root": {
        //   color: "white"
        // }
      },
      "&$selected:hover": {
        backgroundColor: "rgba(255,255,255, 0.3)",
        color: "white",
        "& .MuiListItemIcon-root": {
          color: "white"
        }
      },
      "&:hover": {
        // backgroundColor: "#12016c",
        backgroundColor: "rgba(255,255,255, 0.3)",
        color: "white",
        "& .MuiListItemIcon-root": {
          color: "white"
        }
      },
      cursor: "pointer"
    },
    selected: {}
  })(MuiListItem);

export default Chat;
