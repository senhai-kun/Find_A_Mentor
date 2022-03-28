import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
    typography: {
        fontFamily: [
            'Lexend', 
            'sans-serif'
        ].join(),
        
    },
    components: {
        MuiTypography: {
            defaultProps: {
                color: '#172E59'
            }
        }
        
    }
})

theme = responsiveFontSizes(theme);

export default theme;