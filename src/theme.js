import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
    palette: {
        background: {
            // paper: '#f3f7fa',
        },
        text: {
            primary: "#172E59"
        },
    
    },
    typography: {
        fontFamily: ["Lexend", "sans-serif"].join(),
    },
    components: {
        // MuiTypography: {
        //     defaultProps: {
        //     },

        // },
        MuiContainer: {
            styleOverrides: {
                root: {
                    minWidth: "320px",
                },
            },
        },
    },
    
});

theme = responsiveFontSizes(theme);

export default theme;
