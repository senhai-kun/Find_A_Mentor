
let baseUrl = "http://localhost:5000";

if ( window.location.origin === "https://mentorverse.vercel.app" ) {
    baseUrl = "https://mentorverse.vercel.app";
} else {
    baseUrl = "http://localhost:5000";
}

export default baseUrl;
