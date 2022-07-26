
let baseUrl = "http://localhost:5000";

if ( window.location.origin === "https://find-a-mentor-server.vercel.app" ) {
    baseUrl = "https://find-a-mentor-server.vercel.app";
} else {
    baseUrl = "http://localhost:5000";
}

export default baseUrl;
