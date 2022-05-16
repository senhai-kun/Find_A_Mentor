import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
    palette: {
        background: {
            // paper: '#f3f7fa',
        },
    },
    typography: {
        fontFamily: ["Lexend", "sans-serif"].join(),
    },
    components: {
        MuiTypography: {
            defaultProps: {
                color: "#172E59",
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    minWidth: "300px",
                },
            },
        },
    },
});

theme = responsiveFontSizes(theme);

export default theme;
