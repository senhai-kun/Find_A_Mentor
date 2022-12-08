
let baseUrl = "http://localhost:5000";

if ( window.location.origin === "https://find-mentor.vercel.app" || window.location.origin === "https://mentorverse.vercel.app" ) {
    baseUrl = "https://find-a-mentor-server.vercel.app";
} else {
    baseUrl = "http://localhost:5000";
}

export default baseUrl;
