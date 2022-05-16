import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { makeStyles } from "@mui/styles";

const SearchBar = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 10,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const style = makeStyles((theme) => ({
    input: {
        color: "inherit",
        "& .MuiInputBase-input": {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                width: ({ width }) => `${width > 20 ? 20 : width}ch`,
                "&:focus": {
                    width: "20ch",
                },
            },
        },
        // border: `2px solid ${alpha(theme.palette.common.white, 0.55)}`,
        // borderRadius: '50px'
    },
}));

const Input = () => {
    const [search, setSearch] = useState("");
    const classes = style({
        width: search.length !== 0 ? search.length + 1 : 0,
    });

    return (
        <InputBase
            className={classes.input}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    );
};

const Search = () => {
    return (
        <SearchBar>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <Input />
        </SearchBar>
    );
};

export default Search;
