// import React, { useState, useEffect } from 'react';

// const track = {
//     name: "",
//     album: {
//         images: [
//             { url: "" }
//         ]
//     },
//     artists: [
//         { name: "" }
//     ]
// }

// function WebPlayback(props) {

//     const [is_paused, setPaused] = useState(false);
//     const [is_active, setActive] = useState(false);
//     const [player, setPlayer] = useState(undefined);
//     const [current_track, setTrack] = useState(track);

//     useEffect(() => {

//         const script = document.createElement("script");
//         script.src = "https://sdk.scdn.co/spotify-player.js";
//         script.async = true;

//         document.body.appendChild(script);

//         window.onSpotifyWebPlaybackSDKReady = () => {

//             const player = new window.Spotify.Player({
//                 name: 'Web Playback SDK',
//                 getOAuthToken: cb => { cb(props.token); },
//                 volume: 0.5
//             });

//             setPlayer(player);

//             player.addListener('ready', ({ device_id }) => {
//                 console.log('Ready with Device ID', device_id);
//             });

//             player.addListener('not_ready', ({ device_id }) => {
//                 console.log('Device ID has gone offline', device_id);
//             });

//             player.addListener('player_state_changed', ( state => {

//                 if (!state) {
//                     return;
//                 }

//                 setTrack(state.track_window.current_track);
//                 setPaused(state.paused);

//                 player.getCurrentState().then( state => { 
//                     (!state)? setActive(false) : setActive(true) 
//                 });

//             }));

//             player.connect();

//         };
//     }, []);

//     if (!is_active) { 
//         return (
//             <>
//                 <div className="container">
//                     <div className="main-wrapper">
//                         <b> Instance not active. Transfer your playback using your Spotify app </b>
//                     </div>
//                 </div>
//             </>)
//     } else {
//         return (
//             <>
//                 <div className="container">
//                     <div className="main-wrapper">

//                         <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" />

//                         <div className="now-playing__side">
//                             <div className="now-playing__name">{current_track.name}</div>
//                             <div className="now-playing__artist">{current_track.artists[0].name}</div>

//                             <button className="btn-spotify" onClick={() => { player.previousTrack() }} >
//                                 &lt;&lt;
//                             </button>

//                             <button className="btn-spotify" onClick={() => { player.togglePlay() }} >
//                                 { is_paused ? "PLAY" : "PAUSE" }
//                             </button>

//                             <button className="btn-spotify" onClick={() => { player.nextTrack() }} >
//                                 &gt;&gt;
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }
// }

// export default WebPlayback


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeezerPlayer = () => {
  const [trackData, setTrackData] = useState(null);

  useEffect(() => {
    // Fetch a track from Deezer API
    axios.get('https://api.deezer.com/track/TRACK_ID')
      .then(response => {
        setTrackData(response.data);
      })
      .catch(error => {
        console.error('Error fetching track:', error);
      });
  }, []);

  const playTrack = () => {
    if (!trackData) return null;

    return (
      <div>
        <h2>{trackData.title}</h2>
        <img src={trackData.album.cover_big} alt={trackData.title} />
        <audio controls autoPlay>
          <source src={trackData.preview} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  };

  return <div>{playTrack()}</div>;
};

export default DeezerPlayer;
