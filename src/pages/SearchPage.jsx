import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    Divider,
    MenuItem,
    TextField,
    Stack,
    IconButton,
} from "@mui/material";
import SearchCard from "../components/search/SearchCard";
import Footer from "../components/Footer";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PageLoader from "../components/search/PageLoader";
import AppbarSpace from "../reusable/AppbarSpace";
import Header from "../components/Header";
import axios from 'axios';
import baseUrl from "../utils/baseUrl";
import { useSelector } from "react-redux";
import { isLoading } from "../redux/slicer/authSlice";
import Loading from "../reusable/Loading";
import professions from "../utils/professions";

const SearchPage = () => {
    const loading = useSelector(isLoading);
    const [data, setData] = useState(false);
    const [mentors, setMentors] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [onFilter, setOnFilter] = useState(false);

    useEffect( () => {
        const fetchAllMentors = async () => {
            try {
                const res = await axios.get(`${baseUrl}/mentors`);
    
                // console.log(res.data.mentors)
                setMentors(res.data.mentors);
                setFiltered(res.data.mentors);
                setData(true)
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllMentors();
    }, [])

    return loading ? <Loading /> : (
        <React.Fragment>
            <Header title="Search a Mentor" />

            <AppbarSpace divider />

            <Container sx={{ mt: 8 }}>
                <Filter mentors={mentors} setMentors={setMentors} filtered={filtered} setFiltered={setFiltered} setOnFilter={setOnFilter} />

                <Divider />

                {!data ? (
                    <PageLoader />
                ) : (
                    <Stack mt={5} spacing={4} pb={5}>
                        {onFilter ? filtered.map( (user) => (
                            <React.Fragment key={user?._id}>
                                <SearchCard 
                                    fullname={`${user?.firstname} ${user?.lastname}`}
                                    img={user?.img}
                                    profession={user?.profession}
                                    rating={user?.details?.rating?.rate}
                                    about={user?.details?.about}
                                    skills={user?.details?.skills}
                                    ref_id={user?.ref_id}
                                />
                            </React.Fragment>
                        )) : mentors.map( (user) => (
                            <React.Fragment key={user?._id}>
                                <SearchCard 
                                    fullname={`${user?.firstname} ${user?.lastname}`}
                                    img={user?.img}
                                    profession={user?.profession}
                                    rating={user.details.rating.rate}
                                    about={user.details.about}
                                    skills={user.details.skills}
                                    ref_id={user.ref_id}
                                />
                            </React.Fragment>
                        ))
                        }

                        {filtered.length === 0 && (
                            <Box height="50vh" >

                            </Box>
                        )}
                    </Stack>
                )}
            </Container>

            <Footer />
        </React.Fragment>
    );
};

const Filter = ({ mentors, setMentors, filtered, setFiltered, setOnFilter }) => {
    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");

    useEffect( () => {
        if(category !== "All") {
            // let filter = mentors
            setFiltered(mentors.filter( i => i.profession === category ));
        }
    }, [category])

    const handleSearch = e => {
        e.preventDefault();
        axios.get(`${baseUrl}/search/mentor`, { params: { query: search }})
        .then( res => {
            setMentors(res.data.mentors)
        })
        .catch( err => {
            console.error(err);
        })
        
    }

    return (
        <React.Fragment>
            <Box p={1}>
                <Stack component="form" onSubmit={handleSearch} direction="row" spacing={1}>
                    <TextField
                        type="text"
                        placeholder="Search for a profession or name..."
                        InputProps={{
                            sx: { borderRadius: 50 },
                        }}
                        fullWidth
                        value={search}
                        onChange={ e => setSearch(e.target.value)}
                    />

                    <IconButton type="submit" size="large">
                        <SearchRoundedIcon color="info" fontSize="inherit" />
                    </IconButton>
                </Stack>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="end"
                    spacing={2}
                    mt={5}
                >
                    <TextField
                        size="small"
                        select
                        SelectProps={{
                            sx: { borderRadius: 10, fontWeight: 300 },
                        }}
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            if( e.target.value !== "All" ) {
                                setOnFilter(true);
                            } else {
                                setOnFilter(false);
                            }
                        }}
                        
                    >
                        <MenuItem autoFocus={false} divider value="All">
                            All Category
                        </MenuItem>
                        {professions.map( i => (
                            <MenuItem key={i} value={i} >
                                {i}
                            </MenuItem>
                        ) )}
                    </TextField>
                </Stack>
            </Box>
        </React.Fragment>
    );
};

export default SearchPage;
