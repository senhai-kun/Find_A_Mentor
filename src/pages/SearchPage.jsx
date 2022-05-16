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
import AppbarSpace from "../utils/AppbarSpace";
import { Helmet } from "react-helmet";

const Header = () => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>Find Your Mentor</title>
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
    );
};

const SearchPage = () => {
    const [data, setData] = useState(false);

    useEffect(() => {
        const fake = setTimeout(() => {
            setData(true);
        }, 2000);

        return () => {
            clearTimeout(fake);
        };
    }, []);

    return (
        <React.Fragment>
            <Header />

            <AppbarSpace divider />

            <Container sx={{ mt: 8 }}>
                <Filter />

                <Divider />

                {!data ? (
                    <PageLoader />
                ) : (
                    <Stack mt={5} spacing={4} pb={5}>
                        <SearchCard
                            fullname="Monica Badiu"
                            isVerified
                            img="https://cdn.mentorcruise.com/cache/f2dd6a7a12e4f3903dc1c9b9cea331e3/0fc92fa3aea69827/53dd96af93a989e04300c14eb9695c9c.jpg"
                            course="Conversion Copywriter & Marketing consultant"
                            rating={4}
                            about="I help business owners find their growth formula so they can have the growth and visibility they dream of. I specialize in business growth, copywriting, marketing, and brand storytelling for entrepreneurs who want to take control of their own lives and build a legacy that will last long after they are gone. I am a mom-in-training with an insatiable curiosity for paper art, psychology, and all things marketing!"
                            skills={[
                                "Email Marketing",
                                "Seo for content",
                                "Content marketing",
                                "Sales copywriting",
                            ]}
                            price="250"
                            bookmark
                        />

                        <SearchCard
                            fullname="Ambroise Dhenain"
                            img="https://cdn.mentorcruise.com/cache/b8c395cef923eea45facac69ed777ef4/1a24793c31255947/c53ff680535847043f06e17a573947d2.jpg"
                            course="CTO"
                            rating={5}
                            about={
                                <span>
                                    I have a passion for programming, and
                                    another passion for teaching. I love to
                                    teach people and help them grow. I currently
                                    have 2 mentees to whom I teach programming
                                    (beginner level) outside of MentorCruise.
                                    All my mentees get access to a Community
                                    Discord server, where we discuss
                                    best-practices, provide help and share
                                    useful resources. It also serves as a way to
                                    get quick advices/support, outside of
                                    planned weekly checkpoints. As CTO of a
                                    small startup (3-7 people), I do a lot of
                                    things that aren't programming-related. Such
                                    as GDPR/DPO, product design, legal,
                                    cyber-security, strategy, recruiting, HR,
                                    analytics, SEO, internal organization... I
                                    also take a small part in everything else to
                                    ensure my associates/collaborators have
                                    proper tools to do their job best. (sales,
                                    communication, marketing, support, etc.) I'm
                                    a really organised individual, as such I
                                    also oversee processes and workflows in the
                                    company and I ensure communication between
                                    parties goes well. I love solving problems,
                                    whether they're mine or other's. As a
                                    developer/engineer, I do about everything
                                    from conception to development to monitoring
                                    of production applications. I'm responsible
                                    for all my company's technical stack and
                                    products. My preferred tech stack is the
                                    "JamStack", basically "Static websites on
                                    steroids" and that's why my preferred
                                    framework is Next.js, because it allows both
                                    static pages and dynamic pages and APIs
                                    within the same app. It's the most flexible
                                    framework (all programming languages
                                    confounded) to build websites, as it allows
                                    the developer to choose whether to serve
                                    content in a static or dynamic way, per
                                    page. If you're looking for a passionate who
                                    explains to you not only "how to" do
                                    something, but "why do it" in the first
                                    place, you're at the right door!
                                </span>
                            }
                            skills={[
                                "Founder",
                                "Gitbook",
                                "Html",
                                "Monitoring",
                                "No-code",
                                "Database",
                            ]}
                            price="250"
                        />
                    </Stack>
                )}
            </Container>

            <Footer />
        </React.Fragment>
    );
};

const Filter = () => {
    const [lookingFor, setLookingFor] = useState("Mentor");
    const [category, setCategory] = useState("All");

    return (
        <React.Fragment>
            <Box p={1}>
                <Stack direction="row" spacing={1}>
                    <TextField
                        type="text"
                        placeholder="Search for a course, name, place"
                        InputProps={{
                            sx: { borderRadius: 50 },
                        }}
                        fullWidth
                    />

                    <IconButton size="large">
                        <SearchRoundedIcon color="info" fontSize="inherit" />
                    </IconButton>
                </Stack>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
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
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem autoFocus={false} divider value="All">
                            All Category
                        </MenuItem>
                        <MenuItem dense value="Engineering">
                            Engineering
                        </MenuItem>
                        <MenuItem dense value="Information Technology">
                            Information Technology
                        </MenuItem>
                        <MenuItem dense value="Business & Management">
                            Business & Management
                        </MenuItem>
                        <MenuItem dense value="Product & Marketing">
                            Product & Marketing
                        </MenuItem>
                    </TextField>

                    <TextField
                        size="small"
                        sx={{ alignSelf: "end" }}
                        select
                        SelectProps={{
                            sx: { borderRadius: 10, fontWeight: 300 },
                        }}
                        value={lookingFor}
                        onChange={(e) => setLookingFor(e.target.value)}
                    >
                        <MenuItem value="Mentor">Mentor</MenuItem>
                        <MenuItem value="Mentee">Mentee</MenuItem>
                    </TextField>
                </Stack>
            </Box>
        </React.Fragment>
    );
};

export default SearchPage;
