
let baseUrl = "http://localhost:5000";

if ( window.location.origin === "https://find-mentor.vercel.app" ) {
    baseUrl = "https://find-mentor.vercel.app";
} else {
    baseUrl = "http://localhost:5000";
}

export default baseUrl;
