// // https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#
// export const authEndpoint = "https://accounts.spotify.com/authorize";
// // Replace with your app's client ID, redirect URI and desired scopes

// const clientId = "c120924251a84ee882658b129fbed034";
// const redirectUri = "http://localhost:5173/";

// const scopes = [
//   "user-read-currently-playing",
//   "user-read-recently-played",
//   "user-read-playback-state",
//   "user-top-read",
//   "user-modify-playback-state",
// ];

// export const getTokenFromResponse = () => {
//   return window.location.hash
//     .substring(1)
//     .split("&")
//     .reduce((initial, item) => {
//       var parts = item.split("=");
//       initial[parts[0]] = decodeURIComponent(parts[1]);

//       return initial;
//     }, {});
// };

// export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
//   "%20"
// )}&response_type=token&show_dialog=true`;


// const AUTH_URL =
//   "https://accounts.spotify.com/authorize?client_id=c120924251a84ee882658b129fbed034&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=8b945ef10ea24755b83ac50cede405a0&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


  export default function Spotify() {
    return (
      <div
        className="flex justify-center items-center h-screen"
      >
        <a className="bg-green-500 text-white py-4 px-8 rounded-md" href={AUTH_URL}>
          Login With Spotify
        </a>
      </div>
    )
  }
